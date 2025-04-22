// router/reviewsRouter.js
import express from 'express';  
import {addReview, getReviewsByFoodId} from '../controller/reviewsController.js'

const router = express.Router();

// POST: Add a review
router.post('/add', addReview);

// GET: Get all reviews for a food item
router.get('/:foodId', getReviewsByFoodId);

export default router;  // Use `export default` instead of `module.exports`
