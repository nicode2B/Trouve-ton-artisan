// src/routes/artisanRoutes.js
const express = require('express');
const { Artisan, Specialite, Categorie } = require('../models/index');
const { Op } = require('sequelize');

const router = express.Router();

// 1. Route pour récupérer les 3 "Artisans du mois"
router.get('/artisans/top', async (req, res) => {
    try {
        const topArtisans = await Artisan.findAll({
            limit: 3,
            where: { top_du_mois: true },
            // Joindre les données de la Spécialité et de la Catégorie
            include: [{
                model: Specialite,
                as: 'Specialite',
                include: [{
                    model: Categorie,
                    as: 'Categorie',
                    attributes: ['nom'] // Seulement le nom de la catégorie
                }],
                attributes: ['nom'] // Seulement le nom de la spécialité
            }],
            attributes: ['id', 'nom', 'note', 'ville'], // Champs pour la Card
            order: [['note', 'DESC']]
        });
        res.json(topArtisans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des top artisans.' });
    }
});

// 2. Route pour la liste des artisans (par catégorie OU recherche)
router.get('/artisans', async (req, res) => {
    const { categorie, recherche } = req.query;
    
    // On prépare une clause WHERE pour la recherche de nom
    let whereClause = {};

    // 1. Logique de Recherche par Nom (Barre de recherche)
    if (recherche) {
        whereClause.nom = {
            [Op.like]: `%${recherche}%` // Recherche partielle (LIKE '%texte%')
        };
    }

    // 2. Logique de Filtre par Catégorie (Menu)
    // On devra filtrer sur le nom de la catégorie, ce qui nécessite une jointure
    let includeClause = [{
        model: Specialite,
        as: 'Specialite',
        attributes: ['nom'],
        include: [{
            model: Categorie,
            as: 'Categorie',
            attributes: ['nom']
        }]
    }];

    if (categorie) {
        // Ajout de la condition sur le nom de la Catégorie
        includeClause[0].include[0].where = { nom: categorie };
    }

    try {
        const artisans = await Artisan.findAll({
            where: whereClause,
            include: includeClause,
            attributes: ['id', 'nom', 'note', 'ville'],
            order: [['nom', 'ASC']]
        });
        
        // Sécurité : On retire les artisans qui n'ont pas de catégorie correspondante (si on a filtré)
        // C'est nécessaire car Sequelize gère mal les conditions WHERE sur les modèles inclus 
        // dans le cas de relations MANY-TO-ONE sans un JOIN STRICT.
        const filteredArtisans = artisans.filter(a => a.Specialite && a.Specialite.Categorie);

        res.json(filteredArtisans);

    } catch (error) {
        console.error(error);
        // Si la requête échoue à cause d'un filtre trop restrictif (aucune ligne), ça peut être 500 ou 200 []
        res.status(500).json({ message: 'Erreur lors de la récupération de la liste des artisans.' });
    }
});


// 3. Route pour la "Fiche artisan" (détail)
router.get('/artisans/:id', async (req, res) => {
    try {
        const artisan = await Artisan.findByPk(req.params.id, {
            // Joindre la spécialité et la catégorie
            include: [{
                model: Specialite,
                as: 'Specialite',
                attributes: ['nom'],
                include: [{
                    model: Categorie,
                    as: 'Categorie',
                    attributes: ['nom']
                }]
            }],
            attributes: { exclude: ['specialite_id', 'top_du_mois'] } // Exclure les clés internes
        });

        if (!artisan) {
            return res.status(404).json({ message: 'Artisan non trouvé.' });
        }
        
        res.json(artisan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'artisan.' });
    }
});


module.exports = router;