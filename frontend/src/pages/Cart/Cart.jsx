import React, { useContext } from "react";
import './Cart.css'
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../Context/StoreContext";
const Cart = () => {
  const { cartItems, food_list,url, removeFromCart ,getTotalCartAmount } = useContext(StoreContext);
  
const navigate = useNavigate();

  return <div>
    <div className="cart">
      <div className="cart-item">
        <div  className="cart-item-title">

          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
              <div className="cart-item-title cart-item-item">
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p onClick={()=>removeFromCart(item._id)} className="cross">x</p>
              </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
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
          <button onClick={()=>navigate('/place-order')}>PROCEED TO CHECKOUT</button>
        </div>
        {/* <div className="cart-pronocode">
          <div>
            <p>IF you have a promo code, Enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
          </div>
        </div> */}
      </div>
    </div>

  </div>;
};

export default Cart; // ✅ Ensure this line exists
