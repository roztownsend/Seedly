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
              key={task.user_task_data.id}
              name={task.user_task_data.plant_data.product_name}
              purchaseDate={task.user_task_data.purchase_data.purchase_date}
              imageUrl={task.user_task_data.plant_data.image_url}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default PurchasedSeeds;
