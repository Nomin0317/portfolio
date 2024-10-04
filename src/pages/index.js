import * as React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Seo from "../components/seo";
import * as styles from "../components/index.module.css";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Q5WxxGwjTrSsn51OYlFgP7BHpWzjRiMBn1OlNh3tnJSNBviIoy2wbKdDwu53aMNZGW0jPXw53rAUIQOVu2DLHyu00Fen15B2Q');

const IndexPage = () => {
  const [donations, setDonations] = React.useState([]);

 
  React.useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("http://localhost:3001/donate");
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchDonations();
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <Layout>
        <div className={styles.textCenter}>
          <h1>Welcome to my <b>Portfolio!</b></h1>

          <div className="card-container">
            <Link to="/about" className="card about-card">
              <h2>About Me</h2>
              <p>Learn more about who I am and my background.</p>
            </Link>
            <Link to="/skills" className="card skills-card">
              <h2>Skills</h2>
              <p>Discover the technical skills I've acquired.</p>
            </Link>
            <Link to="/project" className="card projects-card">
              <h2>Project</h2>
              <p>Check out the project I've been working on.</p>
            </Link>
            <Link to="/donation" className="card donation-card">
              <h2>Donate</h2>
              <p>Your support helps me continue my work. Thank you!</p>
            </Link>
            <Link to="/donationHistory" className="card donation-card">
              <h2>Donation History</h2>
              <p>Click to see 10 latest donation history</p>
            </Link>
          </div>
        </div>
      </Layout>
    </Elements>
  );
};

export const Head = () => <Seo title="Home" />

export default IndexPage;

