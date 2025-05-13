import "./page-styles/ProductDetails.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Plant = {
    id: string;
    product_name: string;
    price: number;
    description: string;
    cycle: string;
    image_url: string;
};

const ProductDetails: React.FC = () => {
    const { id } = useParams();
    const [plant, setPlant] = useState<Plant | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPlant = async () => {
            try {
                const res = await fetch("http://localhost:5001/plants");
                const data = await res.json();
                const found = data.data.find((p: Plant) => p.id === id);
                setPlant(found || null);
            } catch (err) {
                console.error("Error fetching plant data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlant();
    }, [id]);

    if (loading) return <div className="px-6 py-10">Loading...</div>;
    if (!plant) return <div className="px-6 py-10">Product not found.</div>;

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

                <p className="product-description">{plant.description}</p>

                <p className="product-details">Cycle: {plant.cycle}</p>

                <div className="product-actions">
                    <div className="quantity-selector flex items-center gap-2">
                        <button className="w-9 h-9 rounded-full border border-gray-400 text-xl">-</button>
                        <span className="text-lg font-medium">1</span>
                        <button className="w-9 h-9 rounded-full border border-gray-400 text-xl">+</button>
                    </div>
                    <button className="btn-add-to-cart">Add to cart</button>

                </div>
            </div>
        </div>
    );
}
export default ProductDetails;