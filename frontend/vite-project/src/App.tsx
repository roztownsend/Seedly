import ProductCard from "./components/card-component/ProductCard"
import ProductCardCart from "./components/card-component/ProductCardCart"
import ProductCardCheckOut from "./components/card-component/ProductCardCheckOut"

const App = () => {
  return (
    <>
    <ProductCard imageUrl={"https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} seedName={"Banana"} price={10} quantity={10} />
    </>
  )
}

export default App
