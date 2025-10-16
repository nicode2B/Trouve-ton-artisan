import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { fetchAllArtisans, fetchCategories } from '../services/api';
import ArtisanCard from '../components/ArtisanCard';

const TEXT_COLOR = "#384050";
const BACKGROUND_COLOR = "#82B864";
const SHADOW_COLOR_RGBA = "rgba(130, 184, 100, 0.3)";
const FILTER_BACKGROUND_COLOR = "#F1F8FC";

const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Définitions des valeurs de filtre basées sur l'URL
    const activeCategory = searchParams.get('categorie') || ''; 
    const activeSearchTerm = searchParams.get('recherche') || ''; 

    const [artisans, setArtisans] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]); 

    // 2. CHARGEMENT INITIAL DES DONNÉES
    useEffect(() => {
        const loadData = async () => {
            try {
                const artisansData = await fetchAllArtisans(); 
                setArtisans(artisansData && Array.isArray(artisansData) ? artisansData : []); 
                
                const categoriesData = await fetchCategories();
                setCategories(categoriesData && Array.isArray(categoriesData) ? categoriesData : []);

            } catch (error) {
                console.error("Erreur lors du chargement des données:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []); 

    // 3. LOGIQUE DE FILTRAGE
    const filteredArtisans = useMemo(() => {
        let currentArtisans = artisans;
        const lowerCaseSearch = activeSearchTerm.toLowerCase();

        // Filtrage par Catégorie/Spécialité
        if (activeCategory) {
            currentArtisans = currentArtisans.filter(artisan => 
                artisan.Catégorie === activeCategory
            );
        }

        // Filtrage par Terme de recherche (Localisation, Nom, ou autre Spécialité)
        if (activeSearchTerm) {
             currentArtisans = currentArtisans.filter(artisan => {
                return (
                    artisan.Nom.toLowerCase().includes(lowerCaseSearch) ||
                    artisan.Ville.toLowerCase().includes(lowerCaseSearch) ||
                    artisan.Spécialité.toLowerCase().includes(lowerCaseSearch)
                );
            });
        }
        
        return currentArtisans;

    }, [artisans, activeSearchTerm, activeCategory]); 


    if (loading) {
        return <div className="text-center text-xl mt-8">Chargement...</div>;
    }

    // 4. FONCTIONS DE GESTION DES INTERACTIONS
    const handleSearchChange = (event) => {
        const value = event.target.value;
        const newSearchParams = new URLSearchParams(searchParams);
        
        if (value) {
            newSearchParams.set('recherche', value); 
        } else {
            newSearchParams.delete('recherche');
        }
        
        setSearchParams(newSearchParams); 
    };
    
    const handleCategoryChange = (event) => {
        const value = event.target.value;
        const newSearchParams = new URLSearchParams(searchParams);
        
        if (value) {
            newSearchParams.set('categorie', value);
        } else {
            newSearchParams.delete('categorie');
        }
        
        setSearchParams(newSearchParams);
    };


    return (
        <> 
            <section className="py-3" style={{backgroundColor: BACKGROUND_COLOR }}>
                <Container>
                    <h1 className="text-center" style={{ color: TEXT_COLOR }}>
                        Liste des artisans
                    </h1>
                </Container>
            </section>

            <section style={{ backgroundColor: FILTER_BACKGROUND_COLOR }}>
                <Container className="py-4"> 
                    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-3">
                        <Row className="align-items-center">
                            <Col xs={12} md={3} lg={2} className="d-flex align-items-center justify-content-md-start mb-3 mb-md-0">
                                <h3 className="h4" style={{ color: TEXT_COLOR, margin: 0}}>
                                    Filtrer par :
                                </h3>
                            </Col>

                            <Col xs={12} md={5} lg={5} className="mb-3 mb-md-0 text-center">
                                <label htmlFor="category-select" className="form-label" style={{ color: TEXT_COLOR, fontWeight: '500'}}>
                                    Spécialité
                                </label>
                                <select
                                    id="category-select"
                                    value={activeCategory}
                                    onChange={handleCategoryChange}
                                    className="form-select p-3 border border-gray-300 rounded-pill shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                    <option value="">Toutes les spécialités</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </Col>

                            <Col xs={12} md={4} lg={5} className="text-center">
                                <label htmlFor="search-input" className="form-label" style={{ color: TEXT_COLOR, fontWeight: '500'}}>
                                    Localisation
                                </label>
                                <input
                                    id="search-input"
                                    type="text"
                                    placeholder="Ville, Nom ou Spécialité..."
                                    value={activeSearchTerm}
                                    onChange={handleSearchChange}
                                    className="form-control p-3 border border-gray-300 rounded-pill shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>

            <Container className="py-4">

                {filteredArtisans.length === 0 && (
                    <p className="text-center text-lg text-gray-600">
                        Désolé, aucun artisan ne correspond à votre recherche.
                    </p>
                )}
                
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Résultats de recherche ({filteredArtisans.length} artisans trouvés)
                </h2>

                {filteredArtisans.length === 0 && (
                    <p className="text-center text-lg text-gray-600">
                        Désolé, aucun artisan ne correspond à votre recherche.
                    </p>
                )}

                <Row className="gx-5"> 
                    {filteredArtisans.map((artisan, index) => {
                        
                        let shadowStyle = {};
                        const offset = '5px';
                        const position = index % 3; 
                        
                        if (position === 0) {
                            shadowStyle = { boxShadow: `-${offset} ${offset} 0 0 ${SHADOW_COLOR_RGBA}` }; 
                        } else if (position === 1) {
                            shadowStyle = { boxShadow: `0 ${offset} 0 0 ${SHADOW_COLOR_RGBA}` };
                        } else {
                            shadowStyle = { boxShadow: `${offset} ${offset} 0 0 ${SHADOW_COLOR_RGBA}` };
                        }
                        
                        return ( 
                            <Col key={index} xs={12} md={6} lg={4} className="mb-5"> 
                                <ArtisanCard artisan={artisan} shadowStyle={shadowStyle} />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
};

export default SearchResults;