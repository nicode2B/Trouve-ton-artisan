const Artisan = require('./Artisan');
const Specialite = require('./Specialite');
const Categorie = require('./Categorie');

// --- Définition des Relations ---

// 1. Catégorie <-> Spécialité (Une Catégorie a plusieurs Spécialités)
Categorie.hasMany(Specialite, {
  foreignKey: 'categorie_id',
  as: 'Specialites'
});
Specialite.belongsTo(Categorie, {
  foreignKey: 'categorie_id',
  as: 'Categorie'
});

// 2. Spécialité <-> Artisan (Une Spécialité a plusieurs Artisans)
Specialite.hasMany(Artisan, {
  foreignKey: 'specialite_id',
  as: 'Artisans'
});
Artisan.belongsTo(Specialite, {
  foreignKey: 'specialite_id',
  as: 'Specialite'
});

module.exports = {
  Artisan,
  Specialite,
  Categorie,
};