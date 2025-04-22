import { Model } from "mongoose";
import userModel from "../models/userModels.js"
//add item to user cart
const addToCart = async (req, res) => {
    const { itemId } = req.body;
    const userId = req.userId; // This comes from your middleware
  
    if (!itemId) {
      return res.json({ success: false, message: "itemId is required" });
    }
  
    try {
      const userData = await userModel.findById(userId);
      const cartData = userData.cartData || {};
  
      if (!cartData[itemId]) {
        cartData[itemId] = 1;
      } else {
        cartData[itemId] += 1;
      }
  
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Server error" });
    }
  };
  
  

  const removeFromCart = async (req, res) => {
    const { itemId } = req.body;
    const userId = req.userId;
  
    if (!itemId) {
      return res.json({ success: false, message: "itemId is required" });
    }
  
    try {
      const userData = await userModel.findById(userId);
      const cartData = userData.cartData || {};
  
      if (cartData[itemId] > 0) {
        cartData[itemId] -= 1;
      }
  
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Server error" });
    }
  };
  

  const getCart = async (req, res) => {
    const userId = req.userId;
  
    try {
      const userData = await userModel.findById(userId);
      const cartData = userData.cartData || {};
      res.json({ success: true, cartData });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Server error" });
    }
  };
  
export  {addToCart, removeFromCart, getCart};