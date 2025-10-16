const Artisan = require('./Artisan');
const Specialite = require('./Specialite');
const Categorie = require('./Categorie');

Categorie.hasMany(Specialite, {
  foreignKey: 'categorie_id',
  as: 'Specialites'
});
Specialite.belongsTo(Categorie, {
  foreignKey: 'categorie_id',
  as: 'Categorie'
});


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