const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Artisan = sequelize.define('Artisan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  note: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
  },
  ville: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  a_propos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  site_web: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  top_du_mois: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  specialite_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'Artisan',
  timestamps: false
});

module.exports = Artisan;
