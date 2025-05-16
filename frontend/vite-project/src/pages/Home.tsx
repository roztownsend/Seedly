import { useEffect } from "react";
import { useCartStore } from "../stores/cartStore";
import Hero from "../components/hero/Hero";
import heroImg from "../assets/image/heroImg.webp"
import ProductGrid from "../components/product-grid/ProductGrid";
function Home() {
  const { cartItems, calculateCartTotal } = useCartStore();

  useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

  return (
    <>
      <section>
        <Hero
          heading={"Spring Vibe"}
          subheading={
            "The time has come for you to buy some seeds, and actually keep track of the growth of your crops!"
          }
          imageUrl={heroImg}
        />
        <ProductGrid 
          heading={"Get ready to sow"} 
          subheading={"Spring has sprong and it’s time for you to get a-plantin, buddy."} 
        />
      </section>
    </>
  );
}

export default Home;
