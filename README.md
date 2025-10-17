# Trouve ton artisan – Documentation Projet

Bienvenue sur le projet Trouve ton artisan, une plateforme de mise en relation entre des clients et des artisans locaux.
Ce projet est une application web en React (SPA) utilisant React-Bootstrap pour le design et l'interface utilisateur.

---

## Déploiement

**Liens**
* Render : https://trouve-ton-artisan-pf5e.onrender.com
* Netlify : https://trouve-ton-artisan01.netlify.app/

---

## 1. Prérequis du Projet

Avant de commencer, assurez-vous que les éléments suivants sont installés sur votre machine :
* Node.js (version 16.x ou supérieure recommandée).

---

## 2. Installation du Projet

Suivez ces étapes pour installer et initialiser le projet en local.

### Étape 2.1 : Cloner le dépôt

```bash

git clone [https://github.com/nicode2B/trouve-ton-artisan.git]
cd Trouve-ton-artisan
```
### Étape 2.2 : Installer les dépendances

* react-bootstrap pour les composants UI (utilisé dans ContactForm.js, ArtisanCard.js, Header.js, etc.).

* react-router-dom pour la gestion des routes (utilisé dans App.js, Home.js, SearchResults.js, etc.).

* react-icons pour les icônes (utilisé dans ArtisanDetail.js, ArtisanCard.js, Header.js).

* react-helmet-async pour la gestion des balises SEO (utilisé dans index.js, LegalPage.js).

Installez toutes les dépendances listées dans package.json :

```bash 

npm install
```

---

## 3. Lancement de l'Application

Une fois les dépendances installées, vous pouvez lancer l'application en mode développement.

### Étape 3.1 : Lancer le mode développement

Exécutez la commande de lancement

```bash

npm start
```

---

## 4. Structure des Dossiers Clés

Voici une brève présentation des dossiers et fichiers principaux :
| Chemin                   | Description                                                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **src/App.js**           | Fichier de configuration des routes (React Router).                                                                   |
| **src/index.js**         | Point d'entrée de l'application, inclut l'initialisation de HelmetProvider pour le SEO                                |
| **src/pages/**           | Contient les composants de page principaux (Home.js, SearchResults.js, ArtisanDetail.js, LegalPage.js, NotFound.js).  |
| **src/components/**      | Contient les composants réutilisables (Header.js, Footer.js, ContactForm.js, ArtisanCard.js).                         |
| **src/services/api.js**  | Fonctions de simulation d'appels API pour les données (artisans, catégories).                                         |
| **src/styles/**          | Contient les styles, notamment custom.scss pour les variables Bootstrap personnalisées.                               |

---

## 5. Design et Accessibilité

**Composants Utilisés**
* Composants de Navigation : Header.js et Footer.js.
* Affichage des Artisans : ArtisanCard.js et ArtisanDetail.js.
* Formulaires : ContactForm.js utilise des champs avec les attributs id, name, et htmlFor pour assurer une bonne accessibilité et autocomplétion des navigateurs.

**Accessibilité (WCAG)**
* Gestion du SEO/Métadonnées : Le composant SEO (via react-helmet-async) est utilisé sur toutes les pages pour les titres et descriptions dynamiques.
* Formulaires : Les champs dans ContactForm.js utilisent la liaison explicite Form.Label (htmlFor) avec Form.Control (id) pour garantir la lisibilité par les lecteurs d'écran.
* Images : Toutes les balises <img> et les composants Image de React-Bootstrap incluent des attributs alt pertinents.

---