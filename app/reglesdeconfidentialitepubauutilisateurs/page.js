import React from 'react';

const ReglesConfidentialite = () => {
  const lastUpdate = "21 février 2026";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg text-gray-800">
      <h1 className="text-3xl font-bold border-b-2 border-blue-600 pb-2 mb-4">
        Règles de Confidentialité
      </h1>
      <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : {lastUpdate}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">1. Collecte des données</h2>
        <p>Nous collectons uniquement les informations nécessaires au bon fonctionnement de la chorale :</p>
        <ul className="list-disc ml-6 mt-2">
          <li><strong>Identité :</strong> Nom, prénom et pupitre (Soprano, Alto, Ténor, Basse).</li>
          <li><strong>Contact :</strong> Adresse e-mail et numéro de téléphone pour les répétitions.</li>
          <li><strong>Médias :</strong> Photos et vidéos des concerts (avec votre accord préalable).</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">2. Utilisation de vos données</h2>
        <p>Vos données sont utilisées exclusivement pour :</p>
        <ul className="list-disc ml-6 mt-2">
          <li>L'organisation des répétitions et des concerts.</li>
          <li>Le partage des partitions et des fichiers audio d'apprentissage.</li>
          <li>La communication interne entre les membres.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">3. Partage et Sécurité</h2>
        <p>
          <strong>Aucune donnée n'est vendue à des tiers.</strong> L'accès aux coordonnées est strictement 
          réservé aux membres inscrits de la chorale via un espace sécurisé par mot de passe.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-700">4. Vos droits (RGPD)</h2>
        <p>
          Conformément à la réglementation, vous disposez d'un droit d'accès, de rectification et de 
          suppression de vos données. Pour toute demande, contactez le bureau de l'association.
        </p>
      </section>

      <div className="mt-10 p-4 bg-blue-50 border-l-4 border-blue-500 italic">
        "Chanter ensemble, c'est partager en toute confiance."
      </div>
    </div>
  );
};

export default ReglesConfidentialite;