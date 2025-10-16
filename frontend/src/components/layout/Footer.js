import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap'; 
import Logo from '../../assets/Logo.png'; 

const legalPages = [
    { name: 'Mentions Légales', path: '/mentions-legales' },
    { name: 'Données Personnelles', path: '/donnees-personnelles' },
    { name: 'Accessibilité', path: '/accessibilite' },
    { name: 'Gestion des Cookies', 'path': '/cookies' },
]; 

const contactInfo = {
    adresse: ['101 cours Charlemagne', 'CS 20033', '69269 LYON CEDEX 02', 'France'],
    telephone: '+33 (0)4 26 73 40 00'
};

const BACKGROUND_COLOR = "#00497C";
const TEXT_COLOR = "#F1F8FC";
const LINE_COLOR = "#384050"; 
const TITLE_COLOR = "#0074C7";

const lineStyle = {
    backgroundColor: LINE_COLOR, 
    height: '2px', 
    width: '90%',
    margin: '0 auto'
};

const copyrightStyle = {
    marginTop: '-50px',
};

const titleUnderlineStyle = {
    borderBottom: `1px solid ${TITLE_COLOR}`, 
    paddingBottom: '5px',                  
    marginBottom: '15px',                  
    display: 'inline-block'                
};

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto pt-5" style={{ backgroundColor: BACKGROUND_COLOR }}> 
            <div className="container" style={{ color: TEXT_COLOR }}>
                
                <div className="row">
                    <div className="col-12 col-lg-10 mx-auto"> 
                        <div className="row pb-4"> 
                            <div className="col-lg-6 col-md-6 mb-4 mb-md-0 text-center">
                                <h5 style={{ ...titleUnderlineStyle, color: TITLE_COLOR }}>Information Légales</h5>
                                <div className="d-flex flex-wrap justify-content-between py-4"> 
                                    <div style={{ width: '40%' }}>
                                        <div className="mb-3">
                                            <Link to={legalPages[0].path} className="text-decoration-none" style={{ color: TEXT_COLOR }}>
                                                {legalPages[0].name}
                                            </Link>
                                        </div>
                                        <div className="mb-2">
                                            <Link to={legalPages[1].path} className="text-decoration-none" style={{ color: TEXT_COLOR }}>
                                                {legalPages[1].name}
                                            </Link>
                                        </div>
                                    </div>
                                    <div style={{ width: '40%' }}>
                                        <div className="mb-3">
                                            <Link to={legalPages[2].path} className="text-decoration-none" style={{ color: TEXT_COLOR }}>
                                                {legalPages[2].name}
                                            </Link>
                                        </div>
                                        <div className="mb-2">
                                            <Link to={legalPages[3].path} className="text-decoration-none" style={{ color: TEXT_COLOR }}>
                                                {legalPages[3].name}
                                            </Link>
                                        </div>
                                    </div>
                                    <div style={{ width: '20%' }}>
                                        <div className="mb-3">
                                            <Link to="/404" className="text-decoration-none" style={{ color: TEXT_COLOR,}}>
                                                404
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6"> 
                                <div className="text-center"> 
                                    <h5 style={{ ...titleUnderlineStyle, color: TITLE_COLOR }}>Nous Contacter (Lyon)</h5>
                                    <address className="mb-1">
                                        {contactInfo.adresse.map((line, index) => (
                                            <span key={index} className="d-block">{line}</span>
                                        ))}
                                    </address>
                                    <p className="mb-0">
                                        Tél : <a href={`tel:${contactInfo.telephone.replace(/\s/g, '')}`} className="text-decoration-none" style={{ color: TEXT_COLOR }}>
                                            {contactInfo.telephone}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Ligne de séparation noire */}
            <div style={lineStyle}></div>

            {/* Section Copyright */}
            <div className="container py-0" style={copyrightStyle}>
                <div className="row align-items-center">
                    
                    {/* Logo (Gauche) */}
                    <div className="col-6">
                        <Image 
                            src={Logo} 
                            alt="Logo de l'entreprise" 
                            height="150" 
                        />
                    </div>
                    
                    {/* Texte de Copyright (Droite) */}
                    <div className="col-6 text-end">
                        <p className="mb-0 small" style={{ color: TEXT_COLOR }}>
                            Copyright © {currentYear} Touve ton artisan. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;