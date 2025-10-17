import { ARTISANS } from '../data/artisansData'; 
import { CATEGORIES } from '../data/categoriesData';

const simulateDelay = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

// 1. Récupère la liste des catégories pour le menu
export const fetchCategories = async () => {
  try {
    await simulateDelay();
    return CATEGORIES;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories locales :", error);
    return [];
  }
};

// 2. Récupère les 3 artisans du mois
export const fetchTopArtisans = async () => {
    try {
        await simulateDelay();
        return ARTISANS.slice(0, 3);
    } catch (error) {
        console.error("Erreur lors de la récupération des top artisans locaux :", error);
        return [];
    }
};

//fonction pour récupérer TOUS les artisans
export const fetchAllArtisans = async () => {
    try {
        await simulateDelay();
        return ARTISANS; 
    } catch (error) {
        console.error("Erreur lors de la récupération de tous les artisans locaux:", error);
        return [];
    }
};

export const fetchArtisans = async (query = {}) => {
    try {
        await simulateDelay();
        let filteredArtisans = ARTISANS;
        
        if (query.category) {
            filteredArtisans = filteredArtisans.filter(a => a.Catégorie === query.category);
        }
        
        return filteredArtisans;
    } catch (error) {
        console.error("Erreur lors de la récupération des artisans locaux :", error);
        return [];
    }
};

// 4. Récupère les détails d'un artisan
export const fetchArtisanDetail = async (id) => {
    try {
        await simulateDelay();
        const artisan = ARTISANS.find(a => a.id.toString() === id.toString()); 
        
        if (artisan) {
            return artisan;
        } else {
            console.warn(`Artisan avec l'ID ${id} non trouvé localement.`);
            return null;
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'artisan ${id} localement :`, error);
        return null;
    }
};

export const submitContactForm = async (artisanEmail, formData) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`[SIMULATION] Email envoyé à ${artisanEmail} avec les données:`, formData);
            resolve({ success: true, message: "Votre message a été envoyé avec succès !" });
        }, 1000);
    });
};