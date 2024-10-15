const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const cors = require('cors');
const path = require('path');

// MongoDB connection URI from environment variable
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Configure CORS options
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://server-nomin.herokuapp.com' : 'http://localhost:8000',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true 
};

app.use(cors(corsOptions));
app.options('*', cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Middleware to parse JSON bodies

// Define the donation schema
const donationSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    created: { type: Date, default: Date.now }
});

// Create the Donation model
const Donation = mongoose.model('Donation', donationSchema);

// POST donation endpoint
app.post('/donate', async (req, res) => {
    const { amount } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount. Please enter a positive number." });
    }

    try {
        const newDonation = new Donation({ amount });
        await newDonation.save(); // Save donation to the database
        res.status(201).json({ message: 'Donation recorded', donation: newDonation });
    } catch (error) {
        console.error('Error saving donation:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// GET donations endpoint
app.get('/donate', async (req, res) => {
    try {
        const donations = await Donation.find().sort({ created: -1 }).limit(10); // Get the latest 10 donations
        res.status(200).json(donations);
    } catch (error) {
        console.error('Error fetching donations:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

 


