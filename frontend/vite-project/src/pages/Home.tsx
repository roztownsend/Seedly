import Hero from "../components/hero/Hero";
import heroImg from "../assets/images/heroImg.webp"

function Home() {
  return (
    <>
      <Hero 
        heading={"Spring Vibes"} 
        description={"The time has come for you to buy some seeds, and actually keep track of the growth of your crops!"} 
        imageObject={heroImg}
      />
    </>
  );
}

export default Home;
