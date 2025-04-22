import express from "express";
import cors from 'cors';
// require ('./config/db');
import connectbd from "./config/db.js";
import foodRouter from "./router/foodRoute.js";
import userRouter from "./router/userRoute.js";
import cartRouter from "./router/cartRoute.js";
import reviewsRouter from './router/reviewsRouter.js';
import dotenv from "dotenv";
import orderRouter from "./router/orderRoute.js";
dotenv.config();





// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

//db connection
connectbd();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use('/api/reviews', reviewsRouter);

app.get("/", (req, res) => {
    res.send("API WORKING");
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});


