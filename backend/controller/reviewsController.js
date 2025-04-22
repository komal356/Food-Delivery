// controller/reviewController.js
import ReviewModel from '../models/ReviewModels.js';  // Use `import`

// Controller to add review
const addReview = async (req, res) => {
  try {
    const review = new ReviewModel(req.body);
    await review.save();
    res.status(200).json({ message: 'Review added successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add review' });
  }
};

// Controller to get reviews for a food item
const getReviewsByFoodId = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({ foodId: req.params.foodId }).sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get reviews' });
  }
};

export { addReview, getReviewsByFoodId };  // Use `export` instead of `module.exports`
