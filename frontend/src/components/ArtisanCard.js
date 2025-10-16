import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; 
import LogoArtisan from '../assets/LogoArtisan.jpg';

const OUTLINE_COLOR = "#82b864"; 
const FILL_COLOR = "#82b864"; 
const TEXT_COLOR = "#384050";
const WHITE_CENTER_COLOR = "#F1F8FC";
const CARD_BACKGROUND_COLOR = "#F1F8FC";

const ArtisanCard = ({ artisan, shadowStyle }) => {  

    const buttonGradientStyle = {
        backgroundImage: `linear-gradient(to right, ${FILL_COLOR} 0%, ${WHITE_CENTER_COLOR} 45%, ${WHITE_CENTER_COLOR} 55%, ${FILL_COLOR} 100% )`,
        background: `linear-gradient(to right, ${FILL_COLOR} 0%, ${WHITE_CENTER_COLOR} 45%, ${WHITE_CENTER_COLOR} 55%, ${FILL_COLOR} 100% ) !important`, 
        color: TEXT_COLOR,
        borderColor: TEXT_COLOR,
        fontWeight: 'bold',
        width: '70%',
        borderRadius: '50px'
    };
    // Fonction pour afficher les étoiles
    const renderQuarterStars = (noteString) => {
        const note = parseFloat(noteString.replace(',', '.')); 
        const stars = [];
        const maxStars = 5;
        
        for (let i = 1; i <= maxStars; i++) {
            if (note >= i) {
                stars.push(
                    <FaStar 
                        key={i} 
                        color={FILL_COLOR} // Vert
                    />
                );
            } else if (note >= i - 1 && note < i) {
                const fractionalPart = note - (i - 1); 
                
                if (fractionalPart >= 0.75) {
                    stars.push(
                        <FaStar 
                            key={i} 
                            color={FILL_COLOR}
                        />
                    ); 
                } else if (fractionalPart >= 0.25) {
                    stars.push(
                        <FaStarHalfAlt 
                            key={i} 
                            color={FILL_COLOR}
                        />
                    );
                } else {
                    stars.push(<FaRegStar key={i} color={OUTLINE_COLOR} />); 
                }
            } else {
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
                        src={LogoArtisan}
                        alt={`Logo de ${artisan.name}`}
                        style={{ height: '130px', width: 'auto' }}
                        className="rounded-4"
                    />
                </div>
                
                <div className="mb-2 d-flex align-items-center justify-content-center">
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