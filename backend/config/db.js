import mongoose from "mongoose";

const connectbd = async () => {
  try {
    await mongoose.connect(
     "mongodb+srv://komalyaseen321:komal123@cluster0.jqvw3.mongodb.net/Food_Del?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
  }
};


export default connectbd;



