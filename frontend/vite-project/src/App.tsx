import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ProductDetails from "./pages/ProductDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import CheckoutPayment from "./pages/CheckoutPayment";
import ShippingForm from "./components/shipping-form/ShippingForm";
import PaymentForm from "./components/payment-form/PaymentForm";

function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products/:id/:slug" element={<ProductDetails />} />
            <Route path="/checkout/shipping" element={<ShippingForm />} />
            <Route path="/checkout/payment" element={<PaymentForm />} />
            <Route path="/checkout/confirm" element={<CheckoutPayment />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
