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
            include: [{
                model: Specialite,
                as: 'Specialite',
                include: [{
                    model: Categorie,
                    as: 'Categorie',
                    attributes: ['nom']
                }],
                attributes: ['nom']
            }],
            attributes: ['id', 'nom', 'note', 'ville'],
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
    let whereClause = {};

    // 1. Logique de Recherche par Nom (Barre de recherche)
    if (recherche) {
        whereClause.nom = {
            [Op.like]: `%${recherche}%`
        };
    }

    // 2. Logique de Filtre par Catégorie (Menu)
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
        includeClause[0].include[0].where = { nom: categorie };
    }

    try {
        const artisans = await Artisan.findAll({
            where: whereClause,
            include: includeClause,
            attributes: ['id', 'nom', 'note', 'ville'],
            order: [['nom', 'ASC']]
        });
        
        const filteredArtisans = artisans.filter(a => a.Specialite && a.Specialite.Categorie);

        res.json(filteredArtisans);

    } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'Erreur lors de la récupération de la liste des artisans.' });
    }
});


// 3. Route pour la "Fiche artisan" (détail)
router.get('/artisans/:id', async (req, res) => {
    try {
        const artisan = await Artisan.findByPk(req.params.id, {
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
            attributes: { exclude: ['specialite_id', 'top_du_mois'] }
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