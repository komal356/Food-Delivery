import React, { useState, useEffect } from 'react';
import './Order.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log("Fetched orders:", response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Fetch failed");
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
  
    try {
      // Call API to update status
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: newStatus,
      });
  
      if (response.data.success) {
        // Update status locally in state
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Error updating order status");
    }
  };
  

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            {/* 1. Image */}
            <img src={assets.parcel_icon} alt="Parcel" />

            {/* 2. Food items */}
            <p className="order-item-food">
              {order.items.map((item, i) => (
                <span key={i}>
                  {item.name} x {item.quentity}
                  {i !== order.items.length - 1 && ', '}
                </span>
              ))}
            </p>

            {/* 3. Name + Address */}
            <div className="order-item-address">
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street},</p>
              <p>
                {order.address.city}, {order.address.state},{' '}
                {order.address.country}, {order.address.zipcode}
              </p>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>

            {/* 4. Item Count */}
            <p>Items: {order.items.length}</p>

            {/* 5. Total Amount */}
            <p>${order.amount}</p>

            {/* 6. Status Dropdown */}
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}  >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
