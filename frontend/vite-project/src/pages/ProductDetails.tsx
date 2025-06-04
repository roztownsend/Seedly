import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import {
  FaHourglassHalf,
  FaRegSadTear,
  FaSun,
  FaRecycle,
  FaSeedling,
} from "react-icons/fa";
import { useCartActions } from "../stores/cartStore";
import { ProductItem } from "../stores/productsStore";
import { QuantityControl } from "../components/quantity-control/QuantityControl";
import { Task } from "../types/types";
import { toast } from "react-hot-toast";
import "./page-styles/ProductDetails.css";

const ProductDetails: React.FC = () => {
  const { slug } = useParams();
  const location = useLocation();
  const id = location.state?.id;
  const [plant, setPlant] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartActions();
  const [tasks, setTasks] = useState<
    {
      id: string;
      description: string;
      start_month: number;
      end_month: number;
    }[]
  >([]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
        const res = await axios.get<ProductItem>(`${baseUrl}/plants/${id}`);
        // fetch all plants but if you're using a different port, adjust the URL accordingly
        const data = res.data;
        console.log(data);

        setPlant(data || null); // defines the product found
      } catch (err) {
        console.error("Error fetching plant data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id]);

  useEffect(() => {
    if (!plant?.id) return;

    const fetchTasks = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, "");
        const res = await axios.get(`${baseUrl}/plants/${plant.id}/tasks`);
        setTasks(res.data);
      } catch (err) {
        setTasks([]);
        console.error("Error fetching tasks", err);
      }
    };

    fetchTasks();
  }, [plant]);

  // Function to group tasks by description and month range
  function groupTasks(tasks: Task[]) {
    const grouped: {
      [desc: string]: { months: [number, number][]; description: string };
    } = {};
    tasks.forEach((task) => {
      if (!grouped[task.description]) {
        grouped[task.description] = {
          months: [],
          description: task.description,
        };
      }
      grouped[task.description].months.push([task.start_month, task.end_month]);
    });
    return Object.values(grouped);
  }

  // add item to cart or update quantity
  const handleAddToCart = () => {
    if (!plant) return;
    addItem({ ...plant, quantity: 1 });
    toast.success(`Product ${plant.product_name} was added to bag!`);
  };

  if (loading)
    return (
      <div className="loading-state">
        <FaHourglassHalf className="state-icon animate-pulse" />
        <p className="status-text state-message">Loading...</p>
      </div>
    );

  if (!plant)
    return (
      <div className="not-found-state">
        <FaRegSadTear className="state-icon" />
        <div className="status-text state-message">
          <p>
            We couldn't find that product. Please try again in a few minutes.
          </p>
          <p>
            If you still get this error, please contact us and we can assist you
            further.
          </p>
          <p>Thanks for your patience!</p>
        </div>
      </div>
    );

  return (
    <div className="product-details-grid">
      <div className="product-image">
        <img
          src={plant.image_url}
          alt={plant.product_name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="product-info">
        <div className="title-price">
          <h1 className="h2 product-title">{plant.product_name}</h1>
          <h3 className="product-price">{plant.price} kr</h3>
        </div>
        <div className="desc-actions">
          <p className="product-description">{plant.description}</p>
          <div className="product-cycles">
            <h5 className="product-tasks-heading h5">Cycle types</h5>
            <ul className="product-tasks__items">
              {Array.isArray(plant.cycle) && plant.cycle.length > 0 ? (
                plant.cycle.map((cycle, idx) => (
                  <li key={idx} className="product-task-item">
                    <span role="img" aria-label="cycle">
                      <FaRecycle />
                    </span>{" "}
                    {cycle}
                  </li>
                ))
              ) : (
                <li>No cycle information available.</li>
              )}
            </ul>
          </div>
          <div className="product-sunlight">
            <h5 className="product-tasks-heading">Sunlight Exposure</h5>
            <ul className="product-tasks__items">
              {plant.sunlight ? (
                <li className="product-task-item">
                  <span role="img" aria-label="sun">
                    <FaSun />
                  </span>{" "}
                  {plant.sunlight}
                </li>
              ) : (
                <li>No sunlight data available.</li>
              )}
            </ul>
          </div>
          <div className="product-tasks">
            <h4 className="product-tasks-heading">
              Tasks for {plant.product_name}
            </h4>
            <ul className="product-tasks__items">
              {tasks.length > 0 ? (
                groupTasks(tasks).map((group, idx) => (
                  <li key={idx} className="product-task-item">
                    <span role="img" aria-label="task">
                      <FaSeedling />{" "}
                    </span>
                    <strong>
                      {group.months
                        .map(
                          ([start, end]) =>
                            months[start - 1] +
                            (start !== end ? ` to ${months[end - 1]}` : "")
                        )
                        .join(", ")}
                    </strong>{" "}
                    {group.description}
                  </li>
                ))
              ) : (
                <li>There are no tasks for this plant at the moment!</li>
              )}
            </ul>
          </div>
          <div className="product-actions">
            <QuantityControl
              cartId={plant.id}
              compact
              fallbackButton={
                <button className="button-primary" onClick={handleAddToCart}>
                  Add to cart
                </button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
