import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create JWT token
const createToken = (id) => {
  console.log("JWT_SECRET:", process.env.JWT_SECRET); // ✅ Debug log
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validation
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Create token
    const token = createToken(user._id);

    res.json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const loginUser = async (req, res) => {

    const {email,password} = req.body;
    try {
        
        const user =await userModel.findOne({email});
         if(!user){
          return res.json({success:false,message:"User Doesn't exist"})
         }

 const isMatch = await bcrypt.compare(password,user.password);
 if(!isMatch){
    return res.json({success:false,message:"invalid cendentials"})
 }
 const token = createToken(user._id);
 res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

};

export { loginUser, registerUser };
