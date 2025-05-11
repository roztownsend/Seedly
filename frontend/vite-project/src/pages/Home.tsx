import { useEffect } from "react";
import { useCartStore } from "../stores/cartStore";
import Sample from "../components/card-component/Sample";
import Hero from "../components/hero/Hero";
import heroImg from "../assets/image/heroImg.webp"
function Home() {
  const { cartItems, calculateCartTotal } = useCartStore();

  useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

  return (
    <>
      <div>
        <Hero 
          heading={"Spring Vibe"} 
          subheading={"The time has come for you to buy some seeds, and actually keep track of the growth of your crops!"} 
          imageUrl={heroImg} 
        />
        <Sample />
      </div>
    </>
  );
}

export default Home;
