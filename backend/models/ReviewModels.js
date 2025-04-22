// models/ReviewModel.js
import mongoose from 'mongoose';  // Use `import`

const reviewSchema = new mongoose.Schema({
  foodId: String, // ID of the food item
  user: String,
  rating: Number,
  comment: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const ReviewModel = mongoose.model('Review', reviewSchema);
export default ReviewModel;  // Use `export default` instead of `module.exports`
