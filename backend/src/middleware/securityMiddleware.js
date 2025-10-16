require('dotenv').config();

const apiAuth = (req, res, next) => {
    const apiKey = req.header('X-API-KEY'); 
    
    if (apiKey !== process.env.API_SECRET_KEY || !apiKey) {
        return res.status(401).json({ error: 'Accès non autorisé à l\'API.' });
    }

    next();
};

module.exports = {
    apiAuth
};
