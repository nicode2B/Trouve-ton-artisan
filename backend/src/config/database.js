const { Sequelize } = require('sequelize');
require('dotenv').config(); // Charge les variables du fichier .env

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Nom de la BDD
  process.env.DB_USER,       // Utilisateur
  process.env.DB_PASSWORD,   // Mot de passe
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql', // Spécifie le dialecte MySQL
    logging: false, // Désactive les logs SQL dans la console (optionnel)
  }
);

// Fonction de test de connexion
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie.');
  } catch (error) {
    console.error('❌ Échec de la connexion à la base de données :', error);
    process.exit(1); // Arrête l'application en cas d'échec
  }
};

module.exports = { sequelize, connectDB };