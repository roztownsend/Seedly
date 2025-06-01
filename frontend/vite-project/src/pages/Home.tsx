import Hero from "../components/hero/Hero";
import heroImg from "../assets/image/heroImg.webp";
import ProductGrid from "../components/product-grid/ProductGrid";
import { Loading } from "../components/loading/Loading";
import { useProductList, useProductLoading, useProductActions } from "../stores/productsStore";
import { useEffect } from "react";

function Home() {
    const productList = useProductList();
    const loading = useProductLoading();
    const { fetchAllPlants } = useProductActions();
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            await fetchAllPlants();
          } catch (error) {
            console.log("Error fetching products")
          }
        }
        fetchData();
    }, [fetchAllPlants])
    
    if (loading) return <Loading />;
    
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

        <Hero
          heading={"Get ready to sow"}
          subheading={
          heading={"Tasty garden treats!"}
          subheading={
            "Spring has sprong and it’s time to plant some free groceries!"
          }
        />
          <ProductGrid products={productList}  filterEdibleOnly={true}/>
      </section>
    </>
  );
}

export default Home;
