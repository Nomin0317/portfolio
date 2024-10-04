const stripe = require('stripe')('sk_test_51Q5WxxGwjTrSsn51YXod0HWkC9dZArjh3CUxGao383zqL0SBPpOE5KqsLDpoKDs09N5m3rTa5Do3WRqpqOJEc7xf006PhF0Yen');
const Donation = require('../components/donationModel'); 

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const { amount } = JSON.parse(event.body);

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
  }
};
