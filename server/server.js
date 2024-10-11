const express = require('express');
const Stripe = require('stripe');
const mongoose = require('mongoose'); 
require('dotenv').config();
const cors = require('cors'); 


const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8000'
  }));



mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/donationDB')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
    });


const donationSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

const Donation = mongoose.model('Donation', donationSchema);



app.post('/donate', async (req, res) => {
    console.log("Received a donation request:", req.body);
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });

        const newDonation = new Donation({ amount });
        await newDonation.save();

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/donate', async (req, res) => {
    try {
        const donations = await Donation.find().sort({ created: -1 }).limit(10);
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

