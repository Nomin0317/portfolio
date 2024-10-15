const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const cors = require('cors');
const path = require('path');

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://server-nomin.herokuapp.com' : 'http://localhost:8000',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true 
};

app.use(cors(corsOptions));
app.options('*', cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/donationDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
    });

const donationSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    created: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', donationSchema);

// POST donation endpoint
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

// GET donations endpoint
app.get('/donate', async (req, res) => {
    try {
        const donations = await Donation.find().sort({ created: -1 }).limit(10);
        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching donations:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 


