import { useEffect } from "react";
import { useCartStore } from "../stores/cartStore";
import Sample from "../components/card-component/Sample";
function Home() {
  const { cartItems, calculateCartTotal } = useCartStore();

  useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

  return (
    <>
      <div>
        <Sample />
      </div>
    </>
  );
}

export default Home;
