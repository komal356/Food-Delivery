import express from "express";
import { addFood, listFood , removeFood} from "../controller/foodController.js"; // Ensure correct path & .js extension
import multer from "multer";

const foodRouter = express.Router();



// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",  // Ensure 'uploads' folder exists
    filename: (req, file, cb) => {
   return     cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage});

// Corrected route
foodRouter.post("/add", upload.single("image"), addFood);
 
foodRouter.get("/list",listFood)

foodRouter.post("/remove",removeFood);
export default foodRouter;
