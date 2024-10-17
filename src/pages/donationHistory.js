import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import "../components/layout";

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);

  React.useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("http://localhost:3001/donations");
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div className="donation-history-card">
      <h2>Latest 10 Donations</h2>
      <ul>
        {donations.map((donation) => (
          <li key={donation._id}>
            <p>Amount: ${(donation.amount / 100).toFixed(2)} USD</p>
            <p>Date: {new Date(donation.created).toLocaleString()}</p>
          </li>
        ))}
      </ul>
      <Link to="/" className="back-to-home">Home Page</Link>
    </div>
  );
};

export default DonationHistory;
