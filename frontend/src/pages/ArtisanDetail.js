// frontend/src/pages/ArtisanDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';
import { FaMapMarkerAlt, FaStar, FaEnvelope, FaGlobe, FaToolbox } from 'react-icons/fa';
import { fetchArtisanDetail } from '../services/api'; 
import ContactForm from '../components/ContactForm'; // << NOUVEL IMPORT
import LogoArtisan from '../assets/LogoArtisan.jpg';

const text_color = "#384050";
const icon_color = "#82B864";

const ArtisanDetail = () => {
    const { id } = useParams(); 
    
    const [artisan, setArtisan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadArtisan = async () => {
            setLoading(true);
            try {
                const data = await fetchArtisanDetail(id); 
                
                if (data && data.id) {
                    setArtisan(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Erreur de chargement des détails de l'artisan:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadArtisan();
    }, [id]);

    if (loading) {
        return <div className="text-center text-xl mt-8">Chargement des détails...</div>;
    }
    
    if (error || !artisan) {
        return <div className="text-center text-xl mt-8 text-danger">Désolé, l'artisan n'a pas été trouvé.</div>;
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                {/* Colonne de Gauche : Détails de l'artisan */}
                <Col lg={8} md={10} xs={12}>
                    <Card className="shadow-lg border-0 artisan-detail-card mb-5"> 
                        <Card.Body className="p-4 p-md-5 bg-custom-light">
                            
                            
                            {/* EN-TÊTE : Spécialité et Note */}
                            <Row className="mb-4 align-items-center border-bottom pb-3">
                                <Col xs={12} className="mb-4 text-center">
                                    {/* h1: Réduire la marge du bas (mb-2) pour rapprocher l'image du nom */}
                                    <h1 className="display-4 font-weight-bold mb-5">{artisan.Nom}</h1>
                                    
                                    {/* 🔑 IMAGE AJOUTÉE ICI */}
                                    {/* REMPLACER '/images/image-certifiee.png' par le chemin d'accès réel de votre image. */}
                                    <img 
                                        src={LogoArtisan}
                                        alt={`Logo de certification pour ${artisan.Nom}`} 
                                        className="d-block mx-auto mb- rounded-5" // d-block assure qu'il prend toute la ligne s'il n'est pas stylisé
                                        style={{ height: '150px', maxWidth: '100%' }} // Exemple de style pour une petite image
                                    />
                                </Col>
                                <Col xs={12} md={9}>
                                <h3 className="text-muted">{artisan.Spécialité}</h3>
                                    <Badge 
                                        bg="info" 
                                        className="text-uppercase p-2"
                                    >
                                        <FaToolbox className="me-2" /> {artisan.Catégorie}
                                    </Badge>
                                    
                                </Col>
                                <Col xs={12} md={3} className="text-md-end mt-3 mt-md-0">
                                    <h2 style={{ color: text_color }}>
                                        <FaStar style={{ color: icon_color }} /> {artisan.Note}
                                    </h2>
                                    {artisan.Top === 'TRUE' && (
                                        <Badge bg="success" className="p-2">Artisan du Mois</Badge>
                                    )}
                                </Col>
                            </Row>
                            
                            {/* SECTION À PROPOS */}
                            <h4 className="mb-3 text-dark">À Propos</h4>
                            <p className="lead mb-5">{artisan['A propos']}</p>
                            
                            {/* INFORMATIONS DE CONTACT */}
                            <h4 className="mb-3 text-dark">Informations de Contact</h4>
                            <ListGroup variant="flush" className="mb-3">
                                <ListGroup.Item>
                                    <FaMapMarkerAlt className="me-3 text-secondary" /> 
                                    Ville : {artisan.Ville}
                                </ListGroup.Item>
                                {artisan.Email && (
                                    <ListGroup.Item>
                                        <FaEnvelope className="me-3 text-secondary" /> 
                                        Email : <a href={`mailto:${artisan.Email}`}>{artisan.Email}</a>
                                    </ListGroup.Item>
                                )}
                                {artisan['Site Web'] && (
                                    <ListGroup.Item>
                                        <FaGlobe className="me-3 text-secondary" /> 
                                        Site Web : <a href={artisan['Site Web']} target="_blank" rel="noopener noreferrer">{artisan['Site Web']}</a>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                
                {/* Colonne de Droite : Formulaire de Contact */}
                <Col lg={12} md={10} xs={12}>
                    {/* Le composant de formulaire est inséré ici, en passant le nom et l'email */}
                    <ContactForm 
                        artisanName={artisan.Nom} 
                        artisanEmail={artisan.Email}
                        className="artisan-detail-card bg-custom-light"
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default ArtisanDetail;