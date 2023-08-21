import React, { useState, useEffect } from "react";
import axios from "axios";

function Comments() {
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/reviews");
      setReviews(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      setReviews([]);
    }
  };

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const handleAddReview = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/reviews",
        { review },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
      setMessage(response.data.message);
      fetchReviews(); // Fetch updated reviews after adding a new review
    } catch (error) {
      console.error("Error:", error);
      setSuccess(false);
      setMessage("Failed to add review.");
    }
  };

  const handleUpdateReview = async (id, updatedReview) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/reviews/${id}`,
        { review: updatedReview },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
      setMessage(response.data.message);
      fetchReviews(); // Fetch updated reviews after updating a review
    } catch (error) {
      console.error("Error:", error);
      setSuccess(false);
      setMessage("Failed to update review.");
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/reviews/${id}`
      );
      setSuccess(true);
      setMessage(response.data.message);
      fetchReviews(); // Fetch updated reviews after deleting a review
    } catch (error) {
      console.error("Error:", error);
      setSuccess(false);
      setMessage("Failed to delete review.");
    }
  };
  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {review.review}
            <button
              onClick={() => handleUpdateReview(review.id, "Updated review")}
            >
              Update
            </button>
            <button onClick={() => handleDeleteReview(review.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2>Add Review</h2>
      <form onSubmit={handleAddReview}>
        <textarea
          value={review}
          onChange={handleInputChange}
          placeholder="Enter your review"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {message && <p className={success ? "success" : "error"}>{message}</p>}
    </div>
  );
}
export default Comments;
