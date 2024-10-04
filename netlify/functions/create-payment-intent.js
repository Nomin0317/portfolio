const stripe = require('stripe')('sk_test_51Q5WxxGwjTrSsn51YXod0HWkC9dZArjh3CUxGao383zqL0SBPpOE5KqsLDpoKDs09N5m3rTa5Do3WRqpqOJEc7xf006PhF0Yen'); 

exports.handler = async (event) => {
  const { amount } = JSON.parse(event.body);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: "usd",
    });

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
};
