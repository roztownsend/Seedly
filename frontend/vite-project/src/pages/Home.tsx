import Sample from "../components/card-component/Sample";
import Hero from "../components/hero/Hero";
import heroImg from "../assets/image/heroImg.webp";
import GridHome from "../components/grid-home/GridHome";

function Home() {
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
        <GridHome
          heading={"Get ready to sow"}
          subheading={
            "Spring has sprong and it’s time for you to get a-plantin, buddy."
          }
        />
      </section>
    </>
  );
}

export default Home;
