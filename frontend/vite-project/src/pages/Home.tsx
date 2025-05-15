import { useEffect } from "react";
import { useCartStore } from "../stores/cartStore";
import Sample from "../components/card-component/Sample";
import Hero from "../components/hero/Hero";
import heroImg from "../assets/image/heroImg.webp";
function Home() {
  const { cartItems, calculateCartTotal } = useCartStore();

  useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

  return (
    <>
      <section>
        <Hero
          heading={"Spring Vibes"}
          subheading={
            "The time has come for you to buy some seeds, and actually keep track of the growth of your crops!"
          }
          imageUrl={heroImg}
        />
        <Sample />
      </section>
    </>
  );
}

export default Home;
