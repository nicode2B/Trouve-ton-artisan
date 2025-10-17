import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArtisanDetail } from "../services/api";

const ArtisanDetail = () => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArtisan = async () => {
      try {
        if (!id) {
          setError("Aucun identifiant fourni pour l'artisan.");
          setLoading(false);
          return;
        }

        const data = await fetchArtisanDetail(id);

        if (data) {
          setArtisan(data);
        } else {
          setError("Aucun artisan trouvé pour cet identifiant.");
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'artisan :", err);
        setError("Impossible de charger les informations de l'artisan.");
      } finally {
        setLoading(false);
      }
    };

    loadArtisan();
  }, [id]);

  // État de chargement
  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Chargement de l'artisan...</p>;
  }

  // Erreur
  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  // Si aucun artisan trouvé
  if (!artisan) {
    return <p className="text-center mt-10 text-gray-500">Aucun artisan trouvé.</p>;
  }

  // Affichage de l'artisan
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-semibold text-center text-blue-700 mb-4">
        {artisan.nom}
      </h2>

      {artisan.image && (
        <img
          src={artisan.image}
          alt={artisan.nom}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <div className="space-y-2 text-gray-700">
        <p><strong>Métier :</strong> {artisan.metier}</p>
        <p><strong>Catégorie :</strong> {artisan.categorie || artisan.Catégorie}</p>
        <p><strong>Ville :</strong> {artisan.ville}</p>
        <p><strong>Description :</strong> {artisan.description}</p>
      </div>
    </div>
  );
};

export default ArtisanDetail;
