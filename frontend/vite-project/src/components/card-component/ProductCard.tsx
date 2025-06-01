import { ProductCardProps } from "../../types/types";
import "./productCard.css";
import { useCartActions } from "../../stores/cartStore";
import { QuantityControl } from "../quantity-control/QuantityControl";
import { memo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast"; 

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { image_url, product_name, price, id } = item;
  const { addItem } = useCartActions();
  // Function to create a slug from the product name
  // This function replaces spaces with dashes and removes special characters to create a URL-friendly string
  function slugify(text: string) {
    return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  }

  const handleAddToCart = () => {
    const tempItem = { ...item, quantity: 1 };
    addItem(tempItem);
    toast.success(`Product ${product_name} was added to bag!`);
  };

  return (
    <section className="product-card">
      <Link
        to={`/products/${slugify(product_name)}`}
        state={{ id }}
      >
      <div className="product-card__image-box">
        <img src={image_url} alt={product_name} className="product-card__img" />
      </div>
      </Link>
      <div className="product-card__details">
        <div className="name-price">
          <h5>{product_name}</h5>
          <p className="product-card__price">{price.toFixed(2)}Kr</p>
        </div>
        <div className="product-card__actions">
          <QuantityControl
            cartId={id}
            fallbackButton={
              <button
                className="button-primary"
                onClick={() => handleAddToCart()}
              >
                Add to Cart
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default memo(ProductCard);
