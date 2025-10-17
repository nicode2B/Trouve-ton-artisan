import artisansData from '../data/artisansData.json';

const simulateDelay = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCategories = async () => {
  try {
    await simulateDelay();
    const categories = [...new Set(artisansData.map(a => a.categorie || a.Catégorie))];
    return categories;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories locales :", error);
    return [];
  }
};

export const fetchTopArtisans = async () => {
  try {
    await simulateDelay();
    return artisansData.slice(0, 3);
  } catch (error) {
    console.error("Erreur lors de la récupération des top artisans locaux :", error);
    return [];
  }
};

export const fetchAllArtisans = async () => {
  try {
    await simulateDelay();
    return artisansData;
  } catch (error) {
    console.error("Erreur lors de la récupération de tous les artisans locaux :", error);
    return [];
  }
};

export const fetchArtisans = async (query = {}) => {
  try {
    await simulateDelay();
    let filteredArtisans = artisansData;

    if (query.category) {
      filteredArtisans = filteredArtisans.filter(
        a =>
          (a.categorie && a.categorie === query.category) ||
          (a.Catégorie && a.Catégorie === query.category)
      );
    }

    return filteredArtisans;
  } catch (error) {
    console.error("Erreur lors de la récupération des artisans locaux :", error);
    return [];
  }
};

export const fetchArtisanDetail = async (id) => {
  try {
    await simulateDelay();
    const artisan = artisansData.find(a => a.id.toString() === id.toString());
    if (artisan) return artisan;
    console.warn(`Artisan avec l'ID ${id} non trouvé localement.`);
    return null;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'artisan ${id} localement :`, error);
    return null;
  }
};

export const submitContactForm = async (artisanEmail, formData) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`[SIMULATION] Email envoyé à ${artisanEmail} avec les données:`, formData);
      resolve({ success: true, message: "Votre message a été envoyé avec succès !" });
    }, 1000);
  });
};
