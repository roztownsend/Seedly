import ProductCardCart from "../card-component/ProductCardCart";
import { useCartItemIds } from "../../stores/cartStore";
import "./cartListItem.css"
const CartItemList: React.FC = () => {
  const cartItemsIds = useCartItemIds();

  return (
    <div className="cart-items-list">
      {cartItemsIds.map((id) => (
        <div key={id} className="list-wrapper">
          <ProductCardCart id={id} />
        </div>
      ))}
    </div>
  );
};

export default CartItemList;
