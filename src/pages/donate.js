// donate.js
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "gatsby";
import "../components/layout.css"; 

const stripePromise = loadStripe('pk_test_51Q5WxxGwjTrSsn51OYlFgP7BHpWzjRiMBn1OlNh3tnJSNBviIoy2wbKdDwu53aMNZGW0jPXw53rAUIQOVu2DLHyu00Fen15B2Q');

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleAmountChange = (e) => setAmount(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!amount || amount <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    if (!stripe || !elements) return; 

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process donation.");
      }

      setSuccess(true);
      setAmount("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="donate-card">
      <h2>Make a Donation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter donation amount in USD"
          min="1"
          required
          className="donation-input"
        />
        <CardElement />
        <button type="submit" className="donate-button">Donate</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Donation successful!</p>}
      </form>
      <Link to="/" className="back-to-home">Home Page</Link>
    </div>
  );
};

const DonatePage = () => (
  <Elements stripe={stripePromise}>
    <Donate />
  </Elements>
);

export default DonatePage;





