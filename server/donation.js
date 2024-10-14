const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Donation = require("../src/components/donationModel"); 

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const { amount } = JSON.parse(event.body);

    // Validate amount
    if (!amount || amount <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid amount. Please enter a positive number." }),
      };
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });

      const newDonation = new Donation({ amount, created: new Date() });
      await newDonation.save();

      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  } else if (event.httpMethod === 'GET') {
    try {
      const donations = await Donation.find().sort({ created: -1 }).limit(10);
      return {
        statusCode: 200,
        body: JSON.stringify(donations),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed." }),
    };
  }
};


