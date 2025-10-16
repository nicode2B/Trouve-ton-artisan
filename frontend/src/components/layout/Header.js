// src/components/layout/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../services/api';
import { Image } from 'react-bootstrap';
// Importe les images locales (Logo et Favicon)
import Logo from '../../assets/Logo.png'; 
import { FaSearch } from 'react-icons/fa'; // FaSearch n'est pas utilisé, mais conservé par habitude

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const CUSTOM_COLOR = "#384050";
  const BACKGROUND_COLOR = "#F1F8FC"

  // Chargement des catégories pour le menu (via l'API)
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  // Fonction de recherche au submit du formulaire
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirige vers la page de liste avec le paramètre de recherche
      navigate(`/recherche?recherche=${searchTerm.trim()}`);
    } else {
      // Si la recherche est vide, va à la liste complète
      navigate(`/recherche`);
    }
  };

  return (
    <header className="shadow-sm" style={{ backgroundColor: BACKGROUND_COLOR }}>
      <nav className="navbar navbar-expand-lg navbar-light container">
        {/* Logo (à gauche, comme sur la maquette) */}
        <Link className="navbar-brand" to="/">
          <Image src={Logo} alt="Logo Trouve ton artisan" height="170" />
        </Link>
        
        {/* Bouton pour la navigation mobile */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenu de la Navbar: Poussé entièrement à droite sur écran large (ms-lg-auto) */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          
          {/* Conteneur Flexbox pour superposer la recherche et les liens */}
          {/* flex-column: force la superposition verticale (recherche puis liens) */}
          {/* align-items-end: aligne les deux éléments à droite */}
          <div className="d-flex flex-column align-items-end ms-lg-auto">
            
            {/* 1. Barre de Recherche (au-dessus) */}
            {/* col-lg-7 : Assure une grande longueur (7 colonnes sur 12) sur les grands écrans */}
            <form className="d-flex mb-5 col-lg-8" onSubmit={handleSearch}>
              <input
                // Classe rounded-pill pour la forme ovale
                className="form-control me-2 rounded-pill shadow-none"
                style={{ boxShadow: 'none', borderColor: CUSTOM_COLOR }}
                type="search"
                placeholder="Rechercher un artisan ..."
                id="search-input" 
                name="search-query"
                aria-label="Recherche"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <button 
                type="submit"
                className="btn-link text-muted p-0 border-0 bg-transparent align-self-center"
                style={{ position: 'relative', right: '35px', zIndex: 10 }}>
                <FaSearch/>
              </button>
            </form>

            {/* 2. Menu par Catégories (en-dessous) */}
            {/* flex-row flex-wrap: affiche les liens horizontalement sur grand écran */}
            {/* justify-content-end: aligne les liens à droite */}
            <ul className="navbar-nav flex-row flex-wrap justify-content-end col-lg-7 w-100">
              {categories.map((categoryName) => (
                <li className="nav-item ms-5" key={categoryName}>
                  <Link 
                    className="nav-link" 
                    to={`/recherche?categorie=${categoryName}`}
                    style={{ color: CUSTOM_COLOR }}
                  >
                    {categoryName}
                  </Link>
                </li>
              ))}
            </ul>
            
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;