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

export const fetchArtisanDetail = async (idParam) => {
  try {
    await simulateDelay();

    // 1) ID absent → on sort proprement
    if (idParam === undefined || idParam === null || idParam === "") {
      console.warn("Aucun ID fourni à fetchArtisanDetail");
      return null;
    }

    const idStr = String(idParam);

    // 2) Recherche tolérante: id, ID, Id (et on protège a et a.id)
    const artisan =
      artisansData.find(a => a && (a.id !== undefined) && String(a.id) === idStr) ||
      artisansData.find(a => a && (a.ID !== undefined) && String(a.ID) === idStr) ||
      artisansData.find(a => a && (a.Id !== undefined) && String(a.Id) === idStr);

    if (artisan) return artisan;

    // (optionnel) si tu passes un slug au lieu d’un id:
    const bySlug = artisansData.find(a =>
      a && a.slug && String(a.slug).toLowerCase() === idStr.toLowerCase()
    );
    if (bySlug) return bySlug;

    console.warn(`Artisan avec l'identifiant "${idStr}" non trouvé localement.`);
    return null;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'artisan ${idParam} localement :`, error);
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
