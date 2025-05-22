import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useCartStore } from "../../stores/cartStore";
import "./PurchasedSeeds.css";

// Task checklist per seed
const seedTasks = [
  { period: "April-May", task: "Sow indoors" },
  { period: "May-June", task: "Plant outdoors" },
  { period: "June-August", task: "Pollinate" },
  { period: "September-October", task: "Harvest" },
];

// Seed card component
const SeedCard = ({ name, purchaseDate }: { name: string; purchaseDate: string }) => (
  <div className="seed-card">
    <div className="seed-image-placeholder" />
    <div className="seed-details">
      <h2>{name}</h2>
      <p>Purchased: {purchaseDate}</p>
      <a href="#" className="repurchase-link">Re-purchase</a>

      <table className="seed-task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Mark Complete</th>
          </tr>
        </thead>
        <tbody>
          {seedTasks.map((task, index) => (
            <tr key={index}>
              <td><strong>{task.period}:</strong> {task.task}</td>
              <td><input type="checkbox" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Main PurchasedSeeds page component
const PurchasedSeeds: React.FC = () => {
  const { cartItems } = useCartStore(); 

  return (
    <>
      <Navbar />

      <main className="dashboard-container">
        <header className="dashboard-header">
          <h1>Welcome to your dashboard!</h1>
          <p>You've got some stuff to do.</p>
          <a className="update-info" href="#">Update my user information</a>
        </header>

        <section className="seeds-grid">
          {[1, 2, 3, 4].map((i) => (
            <SeedCard key={i} name="Pumpkin ‘Sugar Pie’" purchaseDate="2025/03/14" />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PurchasedSeeds;
