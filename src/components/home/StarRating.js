import React from 'react';

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const remainingStars = 5 - filledStars;

  return (
    <div style={{ color: 'beige', display: 'inline-flex' }}>
      {[...Array(filledStars)].map((_, index) => (
        <span key={index}>&#9733;</span>
      ))}
      {[...Array(remainingStars)].map((_, index) => (
        <span key={index}>&#9734;</span>
      ))}
    </div>
  );
};

export default StarRating;
