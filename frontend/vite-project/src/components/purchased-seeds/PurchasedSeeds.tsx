import React from "react";
import SeedCard from "./SeedCard";
import { UserTaskData } from "../../types/userTaskTypes";
import "./PurchasedSeeds.css";

type PurchasedSeedsProps = {
  userTasks: UserTaskData[];
};

const PurchasedSeeds: React.FC<PurchasedSeedsProps> = ({ userTasks }) => {
  return (
    <>
      <header className="dashboard-header">
        <h1>Welcome to your dashboard!</h1>
        <p>You've got some stuff to do.</p>
        <a className="update-info" href="#">
          Update my user information
        </a>
      </header>

      <section className="dashboard-container">
        <div className="seeds-grid">
          {userTasks.map((task) => (
            <SeedCard
              key={task.plant_data.id}
              name={task.plant_data.product_name}
              plantId={task.plant_data.id}
              purchaseDate={task.purchase_data.purchase_date}
              imageUrl={task.plant_data.image_url}
              tasks={task.tasks}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default PurchasedSeeds;
