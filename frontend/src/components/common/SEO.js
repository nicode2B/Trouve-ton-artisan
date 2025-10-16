// src/components/common/SEO.js
import React from 'react';
import { Helmet } from 'react-helmet-async';

// Ce composant met à jour le titre et la description de la page
const SEO = ({ title, description }) => {
  const finalTitle = title || "Trouve ton Artisan";
  // Ne fait rien sans la librairie Helmet, mais permet de corriger l'erreur d'importation
  return (
    <Helmet>
            <title>{finalTitle}</title> 
            
            {/* Si d'autres balises meta sont dynamiques, elles doivent aussi être sécurisées */}
            {description && <meta name="description" content={description} />}
        </Helmet>
  );
};

export default SEO;