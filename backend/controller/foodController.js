import { log } from "console";
import foodModel from "../models/FoodModels.js";
import fs from 'fs'


const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        let image_filename = req.file.filename;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        await food.save();
        res.status(201).json({ success: true, message: "Food Added Successfully", food });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// all food list

const listFood = async (req,res)=>{
try {
    const foods = await foodModel.find({});
    res.json({success:true,data:foods})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
}

}

//remove food
const removeFood =async (req,res)=>{
try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, ()=>{

    })     
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food Removed"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
    
}
}

export { addFood,listFood,removeFood};
