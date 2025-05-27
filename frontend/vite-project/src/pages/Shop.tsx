import ProductGrid from "../components/product-grid/ProductGrid";
import ProductSorter from "../components/product-sorter/ProuctSorter";
import { Loading } from "../components/loading/Loading";
import { useProductList, useProductLoading, useProductActions } from "../stores/productsStore";
import { useEffect } from "react";
import "../pages/page-styles/shop.css";

const Shop: React.FC = () => {
  const productList = useProductList();
  const loading = useProductLoading();
  const { fetchAllPlants } = useProductActions();
  
  useEffect(() => {
    if (productList.length === 0) {
      const fetchData = async () => {
        try {
          await fetchAllPlants();
        } catch (error) {
          console.log("Error fetching produccts")
        }
      }
      fetchData();
    };
  }, [productList, fetchAllPlants])
  
  if (loading) return <Loading />;
  
  console.log(productList);
  return (
  <section className="seeds-assortment">
    <div className="shop-heading">
      <h3>Our Assortment of Seeds</h3>
      </div>
    <div className="assortment-controls">
      <div className="assortment-controls__sorter"><ProductSorter /></div>
      <div className="assortment-controls__count">Showing {productList.length} products</div>
    </div>
    <ProductGrid products={productList} />
  </section>
)};

export default Shop;