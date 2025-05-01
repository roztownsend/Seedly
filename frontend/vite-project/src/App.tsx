<<<<<<< HEAD
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
=======
import ProductCard from "./components/card-component/ProductCard"
import ProductCardCart from "./components/card-component/ProductCardCart"
import ProductCardCheckOut from "./components/card-component/ProductCardCheckOut"

const App = () => {
  return (
    <>
    <ProductCard imageUrl={"https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} seedName={"Banana"} price={10} quantity={10} />
    </>
  )
>>>>>>> d31bd0a (productCard components, hero/shop/cart/check out)
}

export default App;
