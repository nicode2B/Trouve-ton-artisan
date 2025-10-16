// frontend/src/components/ArtisanCard.js

import React from 'react';
import { Card, Button } from 'react-bootstrap';
// Importe les icônes : pleine, moitié, vide
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; 
import LogoArtisan from '../assets/LogoArtisan.jpg';

// COULEUR DU CONTOUR (des étoiles vides)
const OUTLINE_COLOR = "#82b864"; 
// COULEUR DU REMPLISSAGE INTÉRIEUR (Vert)
const FILL_COLOR = "#82b864"; 
const TEXT_COLOR = "#384050";
const WHITE_CENTER_COLOR = "#F1F8FC";
const CARD_BACKGROUND_COLOR = "#F1F8FC";

const ArtisanCard = ({ artisan, shadowStyle }) => {  

    const buttonGradientStyle = {
        // Dégradé de gauche à droite : Vert -> Blanc -> Vert
        backgroundImage: `linear-gradient(to right, ${FILL_COLOR} 0%, ${WHITE_CENTER_COLOR} 45%, ${WHITE_CENTER_COLOR} 55%, ${FILL_COLOR} 100% )`,
        // Pour forcer le background à remplacer la couleur par défaut de Bootstrap
        background: `linear-gradient(to right, ${FILL_COLOR} 0%, ${WHITE_CENTER_COLOR} 45%, ${WHITE_CENTER_COLOR} 55%, ${FILL_COLOR} 100% ) !important`, 
        color: TEXT_COLOR, // Couleur du texte (foncé)
        borderColor: TEXT_COLOR, // Bordure (foncée)
        fontWeight: 'bold', // Rendre le texte gras
        width: '70%', // Garder la largeur personnalisée
        borderRadius: '50px' // Garder les coins arrondis
    };
    // Fonction pour afficher les étoiles avec une granularité au quart d'étoile
    const renderQuarterStars = (noteString) => {
        // Convertit la note en nombre flottant (gère la virgule)
        const note = parseFloat(noteString.replace(',', '.')); 
        const stars = [];
        const maxStars = 5;
        
        for (let i = 1; i <= maxStars; i++) {
            if (note >= i) {
                // 1. Étoile pleine
                stars.push(
                    <FaStar 
                        key={i} 
                        color={FILL_COLOR} // Vert
                    />
                );
            } else if (note >= i - 1 && note < i) {
                // 2. Traitement de l'étoile partielle
                const fractionalPart = note - (i - 1); 
                
                if (fractionalPart >= 0.75) {
                    // Simule le plein pour > 0.75
                    stars.push(
                        <FaStar 
                            key={i} 
                            color={FILL_COLOR}
                        />
                    ); 
                } else if (fractionalPart >= 0.25) {
                    // 1/4 ou 1/2 rempli
                    stars.push(
                        <FaStarHalfAlt 
                            key={i} 
                            color={FILL_COLOR}
                        />
                    );
                } else {
                    // Moins de 1/4 -> Étoile vide (4.1 ou 4.2)
                    stars.push(<FaRegStar key={i} color={OUTLINE_COLOR} />); 
                }
            } else {
                // 3. Étoiles suivantes (vides)
                stars.push(<FaRegStar key={i} color={OUTLINE_COLOR} />);
            }
        }
        return stars;
    };

    return (
        <Card className="h-100" style={{backgroundColor: CARD_BACKGROUND_COLOR, borderColor: TEXT_COLOR, borderWidth: '1px', borderStyle: 'solid', minHeight: '450px', ...shadowStyle}}>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center" style={{ color: TEXT_COLOR }}>{artisan.Nom}</Card.Title>
                <div className="d-flex justify-content-center mb-3"> 
                    <img
                        src={LogoArtisan} // Utilise l'image importée
                        alt={`Logo de ${artisan.name}`}
                        style={{ height: '130px', width: 'auto' }} // 🔑 Ajustez la taille ici
                        className="rounded-4"
                    />
                </div>
                
                <div className="mb-2 d-flex align-items-center justify-content-center">
                    {/* Affiche les étoiles calculées avec la logique de quart */}
                    {renderQuarterStars(artisan.Note)} 
                    <span className="ms-2" style={{ color: TEXT_COLOR }}>({artisan.Note})</span>
                </div>

                <Card.Subtitle className="mb-4" style={{ color: TEXT_COLOR }}>
                    {artisan.Spécialité} - {artisan.Ville}
                </Card.Subtitle>
                
                <Card.Text className="flex-grow-1 mt-3" style={{ color: TEXT_COLOR }}>
                    {artisan['A propos'] ? artisan['A propos'].substring(0, 100) + '...' : 'Pas de description.'}
                </Card.Text>
                
                {/* Bouton de lien vers la page de détails */}
                <div className="text-center mt-3 mt-auto">
                    <Link to={`/artisan/${artisan.id}`}>
                        <Button className="mt-2" style={buttonGradientStyle}>
                            Voir l'artisan
                        </Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ArtisanCard;