import express from "express"
import authMiddleware from "../midelware/auth.js"

import {updateSatus, listOrders, placeOrder, userOrders, verifyOrder } from "../controller/orderController.js"

const orderRouter = express.Router();


orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateSatus)
export default orderRouter;