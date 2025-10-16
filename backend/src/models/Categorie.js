const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Categorie = sequelize.define('Categorie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  }
}, {
  tableName: 'Categorie', // Assure que Sequelize utilise le nom de table correct
  timestamps: false // Pas de colonnes createdAt/updatedAt
});

module.exports = Categorie;