import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaHourglassHalf, FaRegSadTear } from "react-icons/fa";
import { useCartActions, useCartItems } from "../stores/cartStore";
import { FetchAllPlantsResponse, ProductItem } from "../stores/productsStore";
import "./page-styles/ProductDetails.css";

const ProductDetails: React.FC = () => {
  const { id } = useParams(); // get the product ID via route
  const [plant, setPlant] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const cartItems = useCartItems();
  const { addItem, updateQuantity } = useCartActions();
  const existingItem = cartItems.find((cartItem) => cartItem.id === id);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const res = await axios.get<FetchAllPlantsResponse>(
          "http://localhost:5001/plants"
        ); // fetch all plants but if you're using a different port, adjust the URL accordingly
        const data = res.data.data;
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
        <p className="state-message">Loading...</p>
      </div>
    );

  if (!plant)
    return (
      <div className="not-found-state">
        <FaRegSadTear className="state-icon" />
        <p className="state-message">Product not found.</p>
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
        <h1 className="product-title">{plant.product_name}</h1>
        <h3 className="product-price">{plant.price} kr</h3>
        <p className="product-description">{plant.description}</p>
        <p className="product-details">Cycle: {plant.cycle}</p>
        <p className="product-details">Sunlight: {plant.sunlight}</p>

        <div className="product-actions">
          {existingItem?.quantity ? (
            <div className="quantity-selector">
              <button
                className="qty-button"
                onClick={() => updateQuantity(existingItem?.id, 1, "decrement")}
              >
                -
              </button>
              <span className="qty-value">{existingItem?.quantity}</span>
              <button
                className="qty-button"
                onClick={() => updateQuantity(existingItem?.id, 1, "increment")}
              >
                +
              </button>
            </div>
          ) : (
            <button className="btn-add-to-cart" onClick={handleAddToCart}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
