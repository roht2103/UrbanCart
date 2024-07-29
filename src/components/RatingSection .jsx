import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingSection = ({ rating, totalRatings }) => {
  const [hovered, setHovered] = useState(null);
  const [ratingValue, setRatingValue] = useState(rating || 0);

  const handleClick = (value) => {
    setRatingValue(value);
    // Submit the rating to the server or handle it as needed
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-2">Ratings</h2>
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map((star) => {
          return (
            <span
              key={star}
              className="cursor-pointer"
              onClick={() => handleClick(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
            >
              {star <= (hovered || ratingValue) ? (
                <FaStar className="text-yellow-500" />
              ) : star - 0.5 <= (hovered || ratingValue) ? (
                <FaStarHalfAlt className="text-yellow-500" />
              ) : (
                <FaRegStar className="text-yellow-500" />
              )}
            </span>
          );
        })}
      </div>
      <p className="text-gray-700">
        Average Rating: {ratingValue.toFixed(1)} ({totalRatings} reviews)
      </p>
    </div>
  );
};

export default RatingSection;
