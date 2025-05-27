import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import SeedCard from "./SeedCard";

import "./PurchasedSeeds.css";

const PurchasedSeeds: React.FC = () => {
  return (
    <>
     
      <header className="dashboard-header">
        <h1>Welcome to your dashboard!</h1>
        <p>You've got some stuff to do.</p>
        <a className="update-info" href="#">Update my user information</a>
      </header>

      <main className="dashboard-container">
        <section className="seeds-grid">
          {[1, 2, 3, 4].map((i) => (
            <SeedCard key={i} name="Pumpkin ‘Sugar Pie’" purchaseDate="2025/03/14" />
          ))}
        </section>
      </main>

      
    </>
  );
};

export default PurchasedSeeds;
