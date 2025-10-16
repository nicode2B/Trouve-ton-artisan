// backend/server.js

const express = require('express');
const cors = require('cors');
const fs = require('fs'); 
const path = require('path');
require('dotenv').config(); // << NOUVEAU: Importe les variables du fichier .env

const app = express();
const PORT = 3001;
const SECRET_KEY = process.env.API_SECRET_KEY; // Récupère la clé secrète

// --- 1. Configuration et Middlewares ---
app.use(cors({
    origin: 'http://localhost:3000' 
}));
app.use(express.json());

// NOUVEAU MIDDLEWARE : Vérifie la présence et la validité de la clé API
const checkApiKeyMiddleware = (req, res, next) => {
    // La clé est envoyée dans l'en-tête 'X-API-KEY' par votre frontend (api.js)
    const apiKey = req.header('X-API-KEY'); 

    if (!apiKey || apiKey !== SECRET_KEY) {
        // Envoie une erreur 401 (Non autorisé) si la clé est manquante ou incorrecte
        return res.status(401).json({ message: 'Accès non autorisé. Clé API manquante ou invalide.' });
    }
    
    // Si la clé est bonne, passe à la route suivante
    next(); 
};

// Applique le middleware de vérification à TOUTES les routes /api/*
app.use('/api', checkApiKeyMiddleware); 

// --- 2. Fonctions Utilitaires de Lecture Directe ---
// ... (Les fonctions getArtisansArray, getUniqueCategories restent inchangées)

const jsonFilePath = path.join(__dirname, 'trouve_ton_artisan_db.json');

const getArtisansArray = () => {
    try {
        const data = fs.readFileSync(jsonFilePath, 'utf8');
        const allArtisans = JSON.parse(data); 

        if (Array.isArray(allArtisans)) {
            return allArtisans.map((artisan, index) => ({
                ...artisan,
                id: index + 1
            }));
        } else {
            console.error("Le fichier JSON n'est pas un tableau.");
            return [];
        }
    } catch (error) {
        console.error("FATAL: Erreur de lecture du fichier JSON:", error.message);
        return [];
    }
};

const getUniqueCategories = () => {
    const allArtisans = getArtisansArray();
    const categories = allArtisans.map(a => a.Catégorie).filter(c => c);
    return [...new Set(categories)]; 
};

// --- 3. Routes API ---
// Toutes ces routes sont maintenant protégées par le middleware

// Route 1 : Récupérer TOUS les artisans
app.get('/api/artisans', (req, res) => {
    const allArtisans = getArtisansArray();
    console.log(`API /artisans: Renvoi de ${allArtisans.length} artisans.`);
    res.json(allArtisans);
});

// Route 2 : Récupérer les artisans "Top"
app.get('/api/artisans/top', (req, res) => {
    const allArtisans = getArtisansArray();
    const topArtisans = allArtisans.filter(a => a.Top === 'TRUE');
    res.json(topArtisans);
});

// Route 3 : Récupérer la liste des catégories uniques
app.get('/api/categories', (req, res) => {
    const categories = getUniqueCategories();
    res.json(categories);
});

// Route 4 : Récupérer un artisan par ID
app.get('/api/artisans/:id', (req, res) => {
    const artisanId = parseInt(req.params.id);
    const allArtisans = getArtisansArray();
    
    const artisan = allArtisans.find(a => a.id === artisanId); 

    if (artisan) {
        res.json(artisan);
    } else {
        res.status(404).json({ message: 'Artisan non trouvé' });
    }
});


// --- 4. Lancement du serveur ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}. Clé API: ${SECRET_KEY ? 'Active' : 'Désactivée'}`);
});