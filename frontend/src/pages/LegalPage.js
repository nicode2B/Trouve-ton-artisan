import React from 'react';
import { Container, Row, Col, Alert, Image } from 'react-bootstrap';
import SEO from '../components/common/SEO'; 
import constructionImage from '../assets/construction.png'; 

const LegalPage = ({ title = "Page Légale" }) => {
  return (
    <>
      <SEO 
        title={title}
        description={`Page légale de la plateforme Trouve ton artisan : ${title}. Cette page est en construction.`}
      />
      
      <Container className="py-5" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Row className="justify-content-center w-100">
              <Col md={8} lg={6}>
                  <Image 
                      src={constructionImage} 
                      alt="Page en construction" 
                      fluid
                      className="mb-4 d-block mx-auto"
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