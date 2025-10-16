// src/pages/Home.js

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ArtisanCard from '../components/ArtisanCard';
import SEO from '../components/common/SEO';
import { fetchTopArtisans } from '../services/api'; 
import '../styles/custom.scss';

const TEXT_COLOR = "#384050";
const BACKGROUND_COLOR = "#82b864";
const GRADIENT_CENTER_COLOR = "#F1F8FC"
const SHADOW_COLOR_RGBA = "rgba(130, 184, 100, 0.3)";

const Home = () => {
    const [topArtisans, setTopArtisans] = useState([]);

    const gradientButtonStyle = {
        // Dégradé de gauche à droite : Vert -> Blanc -> Vert
        backgroundImage: `linear-gradient(to right, ${BACKGROUND_COLOR}, ${GRADIENT_CENTER_COLOR}, ${BACKGROUND_COLOR})`,
        // Forcer le background (important pour les boutons Bootstrap)
        background: `linear-gradient(to right, ${BACKGROUND_COLOR}, ${GRADIENT_CENTER_COLOR}, ${BACKGROUND_COLOR}) !important`, 
        color: TEXT_COLOR, // Couleur du texte
        borderColor: TEXT_COLOR, // Bordure pour délimiter le bouton
        fontWeight: 'bold',
        borderRadius: '50px',
        maxWidth: '300px', 
        width: '250%',
    };

    useEffect(() => {
        // Chargement des Artisans du Mois
        const loadTopArtisans = async () => {
            const data = await fetchTopArtisans();
            setTopArtisans(data);
        };
        loadTopArtisans();
    }, []);

    return (
        <>
            <SEO 
                title="Accueil"
                description="Trouvez l'artisan idéal près de chez vous. Consultation, évaluation, et contact direct avec les meilleurs professionnels locaux."
            />

            {/* Section Comment trouver mon artisan ? */}
            <section className="how-it-works py-5" style={{ backgroundColor: '#82b864' }}>

                <Container>
                    {/* 🔑 CHANGEMENT : On utilise une Row pour diviser la section en deux colonnes principales */}
                    <Row className="align-items-center" style={{ color: TEXT_COLOR }}> 
                        
                        {/* Colonne GAUCHE : Titre et 4 Points alignés verticalement */}
                        <Col lg={7} md={6} className="mb-4 mb-md-0"> 
                            
                            {/* Titre aligné à gauche */}
                             <h2 className="text-start mb-5" style={{ color: TEXT_COLOR }}>Comment trouver mon artisan ?</h2>
                            
                            {/* 🔑 CHANGEMENT : On supprime la Row interne et on utilise Col xs={12} pour l'alignement vertical */}
                            <Row> 
                                <Col xs={12} className="mb-4" style={{ color: TEXT_COLOR }}>
                                    <p>1. Choisir la catégorie d'artisanat dans le menu.</p>
                                </Col>
                                <Col xs={12} className="mb-4" style={{ color: TEXT_COLOR }}>
                                    <p>2. Choisir un artisan.</p>
                                </Col>
                                <Col xs={12} className="mb-4" style={{ color: TEXT_COLOR }}>
                                    <p>3. Le contacter via le formulaire de contact.</p>
                                </Col>
                                <Col xs={12} className="mb-4" style={{ color: TEXT_COLOR }}>
                                    <p>4. Une réponse sera apportée sous 48h.</p>
                                </Col>
                            </Row>
                        </Col>

                        {/* Colonne DROITE : Bouton d'Action */}
                        <Col lg={5} md={6} className="d-flex justify-content-center" >
                            <div className="text-center">
                                <Link to="/recherche">
                                    <Button size="lg" style={gradientButtonStyle}>
                                        Démarrer ma recherche
                                    </Button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Section Artisans du Mois */}
            <section className="top-artisans py-5" style={{ backgroundColor: '#FFFFFF' }}>
                <Container>
                    <h2 className="text-center mb-5" style={{ color: TEXT_COLOR }}>Les Artisans du Mois</h2>
                    <Row className="mb-5 gx-5 justify-content-center">
                        {topArtisans.length > 0 ? (
                            topArtisans.map((artisan, index) => { 
                                
                                // LOGIQUE DE L'OMBRE BASÉE SUR L'INDEX (répétition du motif tous les 3)
                                let shadowStyle = {}; 
                                const offset = '5px';
                                const position = index % 3; // Utilisation du Modulo 3
                                
                                if (position === 0) {
                                    // Carte 1 (Gauche) : Ombre en bas et à gauche (-X, +Y)
                                    shadowStyle = { boxShadow: `-${offset} ${offset} 0 0 ${SHADOW_COLOR_RGBA}` };
                                } else if (position === 1) {
                                    // Carte 2 (Milieu) : Ombre en bas seulement (0, +Y)
                                    shadowStyle = { boxShadow: `0 ${offset} 0 0 ${SHADOW_COLOR_RGBA}` };
                                } else {
                                    // Carte 3 (Droite) : Ombre en bas et à droite (+X, +Y)
                                    shadowStyle = { boxShadow: `${offset} ${offset} 0 0 ${SHADOW_COLOR_RGBA}` };
                                }
                                
                                return ( // 🔑 Ajout du return explicite pour retourner le JSX
                                    <Col key={artisan.id} md={6} lg={4} className="mb-4">
                                        <ArtisanCard artisan={artisan} shadowStyle={shadowStyle} />
                                    </Col>
                                );
                            })
                        ) : (
                            <Col className="text-center">
                                <p>Aucun artisan mis en avant ce mois-ci pour le moment.</p>
                                <img 
                                    src="/images/loading.gif" 
                                    alt="Chargement des artisans" 
                                    style={{ width: '50px' }} 
                                />
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Home;