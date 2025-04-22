import React from "react";
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import NavBar from "./component/Navbar/navBar";
import Cart from "./pages/Cart/Cart"; // ✅ Make sure this is correct
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./component/Footer/Footer";
import Login from "./component/Login/Login";
import Verify from "./pages/verify/verify";
import MyOrders from "./pages/Myorders/MyOrders";
import FoodItemDetails from "./pages/FooditemDetails/FoodItemDetails";
const App = () => {

  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
           <NavBar setShowLogin={setShowLogin}/>
          
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/Verify" element={<Verify />} />
        <Route path="/MyOrders" element={<MyOrders/>} />
        <Route path="/food/:id" element={<FoodItemDetails />} />

      </Routes>
    </div>
    <Footer/>
    </>
  );
};

export default App;
