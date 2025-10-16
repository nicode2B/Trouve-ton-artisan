import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value }) => {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-warning" aria-hidden="true" />);
  }


  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-warning" aria-hidden="true" />);
  }


  const remaining = 5 - stars.length;
  for (let i = 0; i < remaining; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-warning" aria-hidden="true" />);
  }

  return (
    <div className="d-inline-block" role="img" aria-label={`Note de ${value} sur 5`}>
      {stars}
      <span className="visually-hidden">Note de {value} sur 5</span>
    </div>
  );
};

export default Rating;