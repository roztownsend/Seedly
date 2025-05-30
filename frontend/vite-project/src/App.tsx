import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ProductDetails from "./pages/ProductDetails";
import TestDashboard from "./pages/TestDashboard";
import TestAdminDashboard from "./pages/TestAdminDashboard";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import AdminRoute from "./components/privateRoute/AdminRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import CheckoutPayment from "./pages/CheckoutPayment";
import Payment from "./pages/Payment";
import Shipping from "./pages/Shipping";
import ShippingSelectorPage from "./pages/ShippingSelector";

import DashBoard from "./pages/DashBoard";
import { useAuthActions } from "./stores/authStore";
import { useEffect } from "react";
function App() {
  const { initializeAuth } = useAuthActions();
  useEffect(() => {
    initializeAuth();
  }, []);

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
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/checkout/shipping" element={<Shipping />} />
            <Route path="/checkout/select-shipping" element={<ShippingSelectorPage />} />
            <Route path="/checkout/payment" element={<Payment />} />
            <Route path="/checkout/confirm" element={<CheckoutPayment />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route
              path="/test-dashboard"
              element={
                <PrivateRoute>
                  <TestDashboard />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/admin/test-dashboard"
              element={
                <AdminRoute>
                  <TestAdminDashboard />
                </AdminRoute>
              }
            ></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
