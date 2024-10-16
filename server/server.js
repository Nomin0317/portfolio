const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();
const cors = require('cors');
const path = require('path');

const mongoURI = 'mongodb+srv://Nomin:Altankhuyag@cluster0.hk72p.mongodb.net/donationDB?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => console.error('MongoDB connection error:', err));


const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true 
};

app.use(cors(corsOptions));
app.options('*', cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", 
      "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self';"
    );
    next();
  });


const donationSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    created: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', donationSchema);

app.post('/donate', async (req, res) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount. Please enter a positive number." });
    }

    try {
        const newDonation = new Donation({ amount });
        await newDonation.save(); 
        res.status(201).json({ message: 'Donation recorded', donation: newDonation });
    } catch (error) {
        console.error('Error saving donation:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/donations', async (req, res) => {
    try {
        const donations = await Donation.find().sort({ created: -1 }).limit(10);
        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching donations:', error.message);
        res.status(500).json({ error: error.message });
    }
});
app.use((req, res) => {
    res.status(404).send('404: Not Found');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

 


