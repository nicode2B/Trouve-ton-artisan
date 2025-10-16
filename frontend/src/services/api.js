import axios from 'axios';

// Récupère la clé secrète de l'API définie dans le backend .env
const API_SECRET_KEY = process.env.REACT_APP_API_SECRET_KEY; 

const API_BASE_URL = 'http://localhost:3001/api'; 

// Instance Axios pour simplifier les requêtes
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-API-KEY': API_SECRET_KEY, 
    'Content-Type': 'application/json',
  },
});

// --- Fonctions d'appel API ---

// 1. Récupère la liste des catégories pour le menu
export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    return [];
  }
};

// 2. Récupère les 3 artisans du mois
export const fetchTopArtisans = async () => {
    try {
        const response = await api.get('/artisans/top');
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des top artisans :", error);
        return [];
    }
};

// Nouvelle fonction pour récupérer TOUS les artisans
export const fetchAllArtisans = async () => {
    try {
        const response = await api.get('/artisans'); 
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de tous les artisans:", error);
        return [];
    }
};

// 3. Récupère la liste des artisans
export const fetchArtisans = async (query = {}) => {
    try {
        const response = await api.get('/artisans', { params: query });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des artisans :", error);
        return [];
    }
};

// 4. Récupère les détails d'un artisan
export const fetchArtisanDetail = async (id) => {
    try {
        const response = await api.get(`/artisans/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'artisan ${id} :`, error);
        return null;
    }
};

export const submitContactForm = async (artisanEmail, formData) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Email envoyé à ${artisanEmail} avec les données:`, formData);
            resolve({ success: true, message: "Votre message a été envoyé avec succès !" });
        }, 1000);
    });
};