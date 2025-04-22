import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import './FoodItemDetails.css';

const FoodItemDetails = () => {
  const { url } = useContext(StoreContext);
  const { id } = useParams();
  const location = useLocation();
  const { name, image, description, price } = location.state || {};

  const [reviewForm, setReviewForm] = useState({
    user: '',
    rating: '5',
    comment: '',
  });

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/reviews/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, [id]);

  const handleChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reviewForm.user && reviewForm.comment) {
      const newReview = {
        foodId: id,
        ...reviewForm,
      };

      try {
        await axios.post('http://localhost:4000/api/reviews/add', newReview);
        setReviews([newReview, ...reviews]);
        setReviewForm({ user: '', rating: '5', comment: '' });
      } catch (err) {
        console.error('Error submitting review:', err);
      }
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + Number(r.rating), 0);
    return total / reviews.length;
  };

  const averageRating = getAverageRating();
  const fullStars = Math.round(averageRating);

  if (!name || !image) {
    return <div>Food item not found.</div>;
  }

  return (
    <div className="food-details-container">
      {/* Left: Image */}
      <div>
        <img className="food-details-image" src={url + '/images/' + image} alt={name} />
      </div>

      {/* Right: Info */}
      <div className="food-details-info">
        <h2 className="food-details-title">{name}</h2>
        <p className="food-details-description">{description}</p>
        <p className="food-details-price">${price}</p>

        {/* Average Rating Below Price */}
        <div className="average-rating">
          {reviews.length > 0 ? (
            <>
              <span className="review-stars">{'⭐'.repeat(fullStars)}</span>
              <span className="rating-number">({averageRating.toFixed(1)})</span>
            </>
          ) : (
            <span >No ratings yet</span>
          )}
        </div>

        {/* Review Section */}
        <div className="review-section">
          <h3>Leave a Review</h3>
          <form onSubmit={handleSubmit} className="review-form">
            <input
              type="text"
              name="user"
              placeholder="Your name"
              value={reviewForm.user}
              onChange={handleChange}
              required
            />
            <select name="rating" value={reviewForm.rating} onChange={handleChange}>
              <option value="5">⭐ 5 - Excellent</option>
              <option value="4">⭐ 4 - Good</option>
              <option value="3">⭐ 3 - Average</option>
              <option value="2">⭐ 2 - Poor</option>
              <option value="1">⭐ 1 - Terrible</option>
            </select>
            <textarea
              name="comment"
              placeholder="Write your review..."
              value={reviewForm.comment}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Submit Review</button>
          </form>

          {/* Show reviews */}
          <div className="review-list">
            <h4>Reviews</h4>
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              reviews.map((rev, index) => (
                <div key={index} className="review-item">
                  <strong>{rev.user}</strong>
                  <div className="review-stars">{'⭐'.repeat(Number(rev.rating))}</div>
                  <p>{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItemDetails;
