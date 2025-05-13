import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHourglassHalf, FaRegSadTear } from "react-icons/fa";
import { useCartStore } from "../stores/cartStore";
import { Plant } from "../types/types";
import "./page-styles/ProductDetails.css";

const ProductDetails: React.FC = () => {
    const { id } = useParams(); // get the product ID via route
    const [plant, setPlant] = useState<Plant | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addItem, updateQuantity, cartItems } = useCartStore();

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                const res = await fetch("http://localhost:5001/plants"); // fetch all plants but if you're using a different port, adjust the URL accordingly
                const data = await res.json();
                const found = data.data.find((p: Plant) => p.id === id);
                setPlant(found || null); // defines the product found
            } catch (err) {
                console.error("Error fetching plant data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlant();
    }, [id]);

    // minimum quantity control (1)
    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    // add item to cart or update quantity
    const handleAddToCart = () => {
        if (!plant) return;

        const existing = cartItems.find((item) => item.id === plant.id);

        if (existing) {
            updateQuantity(existing.id, quantity, "increment");
        } else {
            addItem({
                id: plant.id,
                productName: plant.product_name,
                price: plant.price,
                image_url: plant.image_url,
                quantity,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              });
        }
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
                <h2 className="product-price">{plant.price} kr</h2>
                <p className="product-description">Description: {plant.description}</p>
                <p className="product-details">Cycle: {plant.cycle}</p>
                <p className="product-details">Sunlight: {plant.sunlight}</p>
                
                <div className="product-actions">
                    <div className="quantity-selector">
                        <button className="qty-button" onClick={decrement}>-</button>
                        <span className="qty-value">{quantity}</span>
                        <button className="qty-button" onClick={increment}>+</button>
                    </div>
                    <button className="btn-add-to-cart" onClick={handleAddToCart}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ProductDetails;