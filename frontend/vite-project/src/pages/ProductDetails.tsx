import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaHourglassHalf, FaRegSadTear } from "react-icons/fa";
import { useCartActions } from "../stores/cartStore";
import { ProductItem } from "../stores/productsStore";
import { QuantityControl } from "../components/quantity-control/QuantityControl";
import { Task } from "../types/types";
import { useToast } from "../components/toast/ToastContext";
import "./page-styles/ProductDetails.css";

const ProductDetails: React.FC = () => {
  const { id } = useParams(); // get the product ID via route
  const [plant, setPlant] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartActions();
  const [tasks, setTasks] = useState<{ id: string; description: string; start_month: number; end_month: number }[]>([]);
  const { showToast } = useToast();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const res = await axios.get<ProductItem[]>(
          "http://localhost:5000/plants"
        ); // fetch all plants but if you're using a different port, adjust the URL accordingly
        const data = res.data;
        console.log(data);
        const found = data.find((p: ProductItem) => p.id === id);
        setPlant(found || null); // defines the product found
      } catch (err) {
        console.error("Error fetching plant data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/plants/${id}/tasks`);
        setTasks(res.data);
      } catch (err) {
        setTasks([]);
        console.error("Error fetching tasks", err);
      }
    };
    fetchTasks();
  }, [id]);

  // Function to group tasks by description and month range
  function groupTasks(tasks: Task[]) {
    const grouped: { [desc: string]: { months: [number, number][], description: string } } = {};
    tasks.forEach((task) => {
      if (!grouped[task.description]) {
        grouped[task.description] = { months: [], description: task.description };
      }
      grouped[task.description].months.push([task.start_month, task.end_month]);
    });
    return Object.values(grouped);
  }

  // add item to cart or update quantity
  const handleAddToCart = () => {
    if (!plant) return;
    addItem({ ...plant, quantity: 1 });
    showToast(`Product ${plant.product_name} was added to bag!`);
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
          <p>We couldn't find that product. Please try again in a few minutes.</p>
          <p>If you still get this error, please contact us and we can assist you further.</p>
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
          <p className="product-details">
            <strong>Cycle:</strong> {plant.cycle}
            <br />
            <strong>Sunlight:</strong> {plant.sunlight}
          </p>
          <div className="product-tasks">
            <h4 className="product-tasks-heading">
              Tasks for {plant.product_name}
            </h4>
            <ul className="product-tasks__items">
              {tasks.length > 0 ? (
                groupTasks(tasks).map((group, idx) => (
                  <li key={idx} className="product-task-item">
                    <span role="img" aria-label="task">🌱</span>
                    <strong>
                      {group.months
                        .map(
                          ([start, end]) =>
                            months[start - 1] + (start !== end ? ` to ${months[end - 1]}` : "")
                        )
                        .join(", ")}
                    </strong>
                    {" "}{group.description}
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
