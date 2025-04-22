import orderModel from "../models/OrderModels.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config(); // Load env variables

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // uppercase "KEY"

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";

  try {
    // ✅ Use userId from req.userId (from authMiddleware)
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    // Stripe line items
    const line_items = req.body.items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100 * 80), // make sure it's integer
        },
        quantity: item.quantity || 1, // fallback to 1 if undefined/null
      }));
      
    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const verifyOrder = async (req,res) =>{
const {orderId,success} = req.body;
try {
    if(success =="true"){
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"paid"})
    }else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"Not Paid"})
    }
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}

const userOrders = async (req, res) => {
  try {
    const userId = req.userId; // This comes from your authMiddleware (decoding token)
    
    const orders = await orderModel.find({ userId }); // Filter orders by userId
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


// listin order for admin panel 

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders }); // ✅ Fixed spelling
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//Order  status
 const updateSatus = async(req,res) =>{
try {
  await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
  res.json({success:true,message:"Status Update"})
} catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"});
}
 }

export { placeOrder , updateSatus, verifyOrder , userOrders , listOrders};
