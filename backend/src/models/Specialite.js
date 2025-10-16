const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Specialite = sequelize.define('Specialite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  categorie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'Specialite',
  timestamps: false
});

module.exports = Specialite;