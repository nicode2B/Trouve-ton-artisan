require('dotenv').config();

const apiAuth = (req, res, next) => {
    // La clé secrète est lue depuis l'en-tête X-API-KEY
    const apiKey = req.header('X-API-KEY'); 
    
    // Si la clé n'est pas présente ou ne correspond pas à celle dans le .env
    if (apiKey !== process.env.API_SECRET_KEY || !apiKey) {
        // En cas d'échec, renvoie une erreur 401 Non autorisé
        return res.status(401).json({ error: 'Accès non autorisé à l\'API.' });
    }

    // Si la clé est valide, passe à la route suivante
    next();
};

module.exports = {
    apiAuth
};

// Documentation de Sécurité :
// Mise en œuvre : Le middleware vérifie l'existence et la validité d'une clé secrète 
//                 dans l'en-tête 'X-API-KEY'.
// Intérêt : Empêche l'utilisation de l'API par des applications tierces ou des bots, 
//           assurant que seuls le Front-End dédié (qui connait la clé) peut y accéder.