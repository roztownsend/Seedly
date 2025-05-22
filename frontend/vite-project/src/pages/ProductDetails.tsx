import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaHourglassHalf, FaRegSadTear } from "react-icons/fa";
import { useCartActions } from "../stores/cartStore";
import { ProductItem } from "../stores/productsStore";
import { QuantityControl } from "../components/quantity-control/QuantityControl";
import "./page-styles/ProductDetails.css";

const ProductDetails: React.FC = () => {
  const { id } = useParams(); // get the product ID via route
  const [plant, setPlant] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartActions();

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

  // add item to cart or update quantity
  const handleAddToCart = () => {
    if (!plant) return;
    addItem({ ...plant, quantity: 1 });
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
          We couldn't find that product. Please try again in a few minutes. If
          you still get this error, please contact us and we can assist you
          further. Thanks for your patience!
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
              <li>
                <strong>Task:</strong> This is some placeholder text to test
                styling.
              </li>
              <li>
                <strong>Another Task:</strong> This is some more placeholder
                text.
              </li>
              <li>
                <strong>One More Task:</strong> This is one last placeholder
                text to test styling.
              </li>
            </ul>
          </div>
          <div className="product-actions">
            <QuantityControl
              cartId={plant.id}
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
