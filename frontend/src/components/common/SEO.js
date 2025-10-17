import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description }) => {
  const finalTitle = title || "Trouve ton Artisan";
  return (
    <Helmet>
      <title>{finalTitle}</title> 
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};

export default SEO;