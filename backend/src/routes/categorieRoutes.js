const express = require('express');
const { Categorie } = require('../models/index');

const router = express.Router();

router.get('/categories', async (req, res) => {
    try {
        const categories = await Categorie.findAll({
            attributes: ['nom'],
            order: [['nom', 'ASC']]
        });
        const noms = categories.map(c => c.nom);
        res.json(noms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des catégories.' });
    }
});

module.exports = router;