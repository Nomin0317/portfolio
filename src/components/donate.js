const express = require("express");
const app = express();
const Donation = require("./donationModel");
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

app.use(express.json()); 


const validateDonationAmount = (req, res, next) => {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount. Please enter a positive number." });
    }
    next();
};

app.post('/donate', validateDonationAmount, async (req, res) => {
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
