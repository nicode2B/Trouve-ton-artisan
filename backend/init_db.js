const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const csvFilePath = path.join(__dirname, 'data.csv'); 
const jsonFilePath = path.join(__dirname, 'trouve_ton_artisan_db.json');

const init = async () => {
    try {
        const jsonArray = await csv().fromFile(csvFilePath);
        
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 4));

        console.log('✅ Base de données initialisée avec succès à partir du CSV.');
        console.log(`Nombre d'enregistrements : ${jsonArray.length}`);
        
    } catch (error) {
        console.error('❌ Échec de l\'initialisation de la base de données:', error.message);
        console.error('Vérifiez le nom et l\'emplacement du fichier CSV.');
    }
};

init();