import axios from 'axios';

// ⚠️ Récupère la clé secrète de l'API définie dans le backend .env
// Pour un projet React, la variable doit commencer par REACT_APP_
// Tu DOIS créer un fichier .env à la racine de ton dossier 'frontend'
// avec la ligne : REACT_APP_API_SECRET_KEY=ta_super_cle_secrete_et_tres_longue_123456789
const API_SECRET_KEY = process.env.REACT_APP_API_SECRET_KEY; 

// URL de base de l'API Node.js
const API_BASE_URL = 'http://localhost:3001/api'; 

// Instance Axios pour simplifier les requêtes
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    // ⚠️ Ajoute la clé secrète dans l'en-tête de chaque requête
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
    return []; // Retourne un tableau vide en cas d'erreur
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

// 3. Récupère la liste des artisans (avec filtre de recherche/catégorie)
export const fetchArtisans = async (query = {}) => {
    // query peut contenir { categorie: 'Alimentation' } ou { recherche: 'boulanger' }
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

// 5. Soumission du formulaire de contact (Simulation)
// L'API ne gère pas encore l'envoi d'email, nous allons donc simuler cette fonction
export const submitContactForm = async (artisanEmail, formData) => {
    // ⚠️ TODO: Implémenter la route d'envoi d'email dans l'API backend
    
    // Simulation d'une réponse réussie
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Email envoyé à ${artisanEmail} avec les données:`, formData);
            resolve({ success: true, message: "Votre message a été envoyé avec succès !" });
        }, 1000);
    });
};