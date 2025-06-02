import Hero from "../components/hero/Hero";
import heroImg from "../assets/image/heroImg.webp";
import ProductGrid from "../components/product-grid/ProductGrid";
import { Loading } from "../components/loading/Loading";
import { useProductList, useProductLoading, useProductActions } from "../stores/productsStore";
import { useEffect } from "react";
import "./page-styles/home.css";

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
    <div className="home">
      <section className="hero">
        <Hero
          heading={"Spring Vibes"}
          subheading={
            "The time has come for you to buy some seeds, and actually keep track of the growth of your crops!"
          }
          imageUrl={heroImg}
        />
      </section>

      <section className="campaign">
        <div className="campaign-header">
          <h3 className="hero-desktop-heading">Tasty garden treats!</h3>
            <p className="hero-desktop-subheading">Spring has sprong and it's time to plant some free groceries!</p>
        </div>
        <ProductGrid products={productList}  filterEdibleOnly={true}/>
      </section>
    </div>
  );
}

export default Home;
