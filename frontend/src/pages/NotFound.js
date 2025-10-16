// frontend/src/pages/NotFound.js

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NotFoundImage from '../assets/404.png';

const TEXT_COLOR = "#384050";
const BACKGROUND_COLOR = "#82b864";
const GRADIENT_CENTER_COLOR = "#F1F8FC";

const NotFound = () => {
    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '400px', // Limite la hauteur
        marginBottom: '20px',
        border: '2px solid #CD2C2E',
        borderRadius: '8px'
    };

    const gradientButtonStyle = {
        // Dégradé de gauche à droite : Vert -> Blanc -> Vert
        backgroundImage: `linear-gradient(to right, ${BACKGROUND_COLOR}, ${GRADIENT_CENTER_COLOR}, ${BACKGROUND_COLOR})`,
        background: `linear-gradient(to right, ${BACKGROUND_COLOR}, ${GRADIENT_CENTER_COLOR}, ${BACKGROUND_COLOR}) !important`,  
        color: TEXT_COLOR, // Couleur du texte (foncé)
        borderColor: TEXT_COLOR, // Bordure (foncée)
        fontWeight: 'bold',
        borderRadius: '50px', // Coins arrondis
    };

    return (
        <Container className="py-5 text-center" style={{ minHeight: '80vh', color: TEXT_COLOR }}>
            <Row className="justify-content-center">
                <Col md={8}>
                    <img 
                        src={NotFoundImage} 
                        alt="Illustration Page Non Trouvée" 
                        style={imageStyle} 
                        className="img-fluid" // Classe Bootstrap pour la rendre responsive
                    />
                    <h2 className="display-1 font-weight-bold" style={{ color: TEXT_COLOR }}>Page non trouvée</h2>
                    <p className="lead mb-5">
                        * Erreur lors du chargement de votre page.
                    </p>
                    <Link to="/">
                        <Button size="lg" style={gradientButtonStyle}>
                            Retourner à l'accueil
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;