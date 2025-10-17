-- -----------------------------------------------------
-- Script d'alimentation de la base de données `trouve_ton_artisan`
-- -----------------------------------------------------

USE `trouve_ton_artisan`;

-- 1. Alimentation de la table `Categorie`
INSERT INTO `Categorie` (`id`, `nom`) VALUES
(1, 'Alimentation'),
(2, 'Bâtiment'),
(3, 'Services'),
(4, 'Fabrication');

-- 2. Alimentation de la table `Specialite`
INSERT INTO `Specialite` (`id`, `nom`, `categorie_id`) VALUES
-- Catégorie 'Alimentation' (id=1)
(1, 'Boucher', 1),
(2, 'Boulanger', 1),
(3, 'Chocolatier', 1),
(4, 'Traiteur', 1),

-- Catégorie 'Bâtiment' (id=2)
(5, 'Chauffagiste', 2),
(6, 'Couvreur', 2),
(7, 'Électricien', 2),
(8, 'Menuisier', 2),

-- Catégorie 'Services' (id=3)
(9, 'Coiffeur', 3),
(10, 'Toiletteur', 3),
(11, 'Webdesign', 3),
(12, 'Fleuriste', 3),

-- Catégorie 'Fabrication' (id=4)
(13, 'Bijoutier', 4);


-- 3. Alimentation de la table `Artisan`

INSERT INTO `Artisan` (`nom`, `note`, `ville`, `a_propos`, `email`, `site_web`, `top_du_mois`, `specialite_id`) VALUES
-- Alimentation
('Boucherie Dumont', 4.5, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'boucherie.dumond@gmail.com', NULL, FALSE, 1), -- Boucher (id=1)
('Au pain chaud', 4.8, 'Montélimar', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'aupainchaud@hotmail.com', NULL, TRUE, 2), -- Boulanger (id=2)
('Chocolaterie Labbé', 4.9, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', TRUE, 3), -- Chocolatier (id=3)
('Traiteur Truchon', 4.1, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', FALSE, 4), -- Traiteur (id=4)

-- Bâtiment
('Orville Salmons', 5.0, 'Evian', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'o.salmons@gmail.com', NULL, TRUE, 5), -- Chauffagiste (id=5)
('F. Hélène Couverture', 4.7, 'Grenoble', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'f.helene-couv@hotmail.fr', 'https://fhelene-couverture.fr', FALSE, 6), -- Couvreur (id=6)
('Électricité Domicile', 4.2, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'elec-domicile@gmail.com', 'https://elecdomicile.fr', FALSE, 7), -- Électricien (id=7)
('Menuiserie Bois-Art', 4.5, 'Annecy', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'menuiserie.boisart@gmail.com', 'https://boisart-menuiserie.fr', FALSE, 8), -- Menuisier (id=8)

-- Services
('Coiffure Léala', 3.8, 'Chambéry', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', FALSE, 9), -- Coiffeur (id=9)
('C\'est sup\'hair', 4.1, 'Romans-sur-Isère', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'sup-hair@gmail.com', 'https://sup-hair.fr', FALSE, 9), -- Coiffeur (id=9)
('Le monde des fleurs', 4.6, 'Annonay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', FALSE, 12), -- Fleuriste (id=12)
('Valérie Laderoute', 4.5, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'v-laredoute@gmail.com', NULL, FALSE, 10), -- Toiletteur (id=10)
('CM Graphisme', 4.4, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitu... ', 'cm-graphisme@gmail.com', 'https://cm-graphisme.fr', FALSE, 11), -- Webdesign (id=11)

-- Fabrication
('Atelier Bijoux Or', 4.9, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ', 'atelier-or@gmail.com', 'https://atelier-bijoux-or.fr', TRUE, 13); -- Bijoutier (id=13)