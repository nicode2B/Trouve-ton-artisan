import React from 'react';
import { Container, Row, Col, Alert, Image } from 'react-bootstrap'; // 🔑 Import de Image, Row, Col, Alert
import SEO from '../components/common/SEO'; 
// 🔑 Import de l'image (Assurez-vous que le chemin est correct)
import constructionImage from '../assets/construction.png'; 

// 🔑 CORRECTION HELMET : Donne une valeur par défaut à 'title' si elle est manquante.
const LegalPage = ({ title = "Page Légale" }) => {
  return (
    <>
      {/* Ajout des balises meta SEO (WCAG + Référencement) */}
      <SEO 
        title={title} // Title est garanti d'être une string valide
        description={`Page légale de la plateforme Trouve ton artisan : ${title}. Cette page est en construction.`}
      />
      
      {/* 🔑 STRUCTURE POUR L'IMAGE ET L'ALERTE CENTRÉE (comme dans l'exemple précédent) */}
      <Container className="py-5" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Row className="justify-content-center w-100">
              <Col md={8} lg={6}>

                  {/* 🔑 AJOUT DE L'IMAGE AU-DESSUS DU TEXTE */}
                  <Image 
                      src={constructionImage} 
                      alt="Page en construction" 
                      fluid // Rend l'image responsive
                      className="mb-4 d-block mx-auto" // Centre l'image
                      style={{ maxWidth: '700px', height: 'auto' }}
                  />

                  <Alert variant="info" className="py-5 shadow-lg bg-custom-light border-dark-important">
                      
                      <p className="lead text-dark">
                          Nous travaillons activement à la finalisation de cette Page.
                      </p>
                      <hr/>
                      <p className="text-dark">
                          Le contenu de cette page sera complété ultérieurement par un cabinet spécialisé. Merci de votre compréhension.
                      </p>
                  </Alert>

              </Col>
          </Row>
      </Container>
    </>
  );
};

export default LegalPage;