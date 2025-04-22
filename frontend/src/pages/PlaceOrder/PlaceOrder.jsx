import React, { useContext, useEffect, useState } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, url, cartItems  } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  
  const placeOrder = async (event) => {
    event.preventDefault(); // ✅ Fixed spelling
  
    let orderItems = [];
  
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quentity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
  
    const orderData = {
  
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
  
    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
  
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url); // ✅ Should redirect now
      } else {
        alert("Order failed. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Server error. Please try later.");
    }
  };
  const navigate = useNavigate();
  
  useEffect(()=>{
 if(!token){
navigate('/cart')
 }
 else if(getTotalCartAmount()===0){
  navigate('/cart')
 }
  },[token])

  return (
    

    <form onSubmit={placeOrder} action="" className="place-order">

    <div className='place-order-left'>
      <p className="title">
        Delivery Information
      </p>
    <div className="multi-fields">
      <input required  name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name"/>
      <input required  name="lastName"onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name"/>
    </div>
    <input required name="email"onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address"/>
      <input  required name="street"onChange={onChangeHandler} value={data.street} type="text" placeholder="Street"/>
    <div className="multi-fields">
    <input required name="city"onChange={onChangeHandler} value={data.city} type="text" placeholder="City"/>
    <input required  name="state"onChange={onChangeHandler} value={data.state} type="text" placeholder="State"/>
    </div>
    <div className="multi-fields">
    <input required name="zipcode"onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code"/>
    <input required  name="country"onChange={onChangeHandler} value={data.country} type="text" placeholder="Country"/>
    </div>
    <input required  name="phone"onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone"/>
    </div>
    <div className="place-order-right">
    <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"> 
<p>SubTotal</p>
<p>${getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
<p>Delivery Fee</p>
<p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <div className="cart-total-details">
<p>Total</p>
<p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
          </div>
          <button type='submit'  >PROCEED TO PAYMENT</button>
        </div>
    </div>
    </form>
  )
  
}

export default PlaceOrder
