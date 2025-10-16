// src/components/common/Rating.js
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Nous allons installer react-icons

const Rating = ({ value }) => {
  // Fonction pour générer le bon nombre d'étoiles pleines, moitiés et vides
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 !== 0; // Vrai si la partie décimale n'est pas zéro

  // Étoiles pleines
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-warning" aria-hidden="true" />);
  }

  // Étoile à moitié
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-warning" aria-hidden="true" />);
  }

  // Étoiles vides (compléter jusqu'à 5)
  const remaining = 5 - stars.length;
  for (let i = 0; i < remaining; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-warning" aria-hidden="true" />);
  }

  // WCAG : Ajout d'un texte de remplacement pour les lecteurs d'écran
  return (
    <div className="d-inline-block" role="img" aria-label={`Note de ${value} sur 5`}>
      {stars}
      <span className="visually-hidden">Note de {value} sur 5</span>
    </div>
  );
};

export default Rating;