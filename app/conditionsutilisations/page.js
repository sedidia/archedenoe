import React from 'react';

const ConditionsUtilisation = () => {
  const dateMiseAJour = "21 février 2026";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-gray-800 leading-relaxed">
      <header className="border-b pb-4 mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">Conditions Générales d'Utilisation</h1>
        <p className="text-sm text-gray-500 mt-2">Dernière mise à jour : {dateMiseAJour}</p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Objet de l'application</h2>
        <p>
          Cette application est destinée aux membres de la chorale <strong>[Nom de votre Chorale]</strong>. 
          Elle a pour but de faciliter la communication, le partage des partitions, des fichiers audio de répétition 
          et la gestion du calendrier des événements.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Accès et Identifiants</h2>
        <p>
          L'accès est réservé aux membres actifs à jour de leur cotisation. Vos identifiants sont personnels 
          et confidentiels. Vous êtes responsable du maintien de la confidentialité de votre compte.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Propriété Intellectuelle (Partitions)</h2>
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 italic">
          Les partitions et documents pédagogiques fournis sur cette application sont protégés par le droit d'auteur. 
          Leur usage est strictement réservé au cadre privé de la chorale. Toute diffusion publique ou commerciale est interdite.
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Droit à l'image</h2>
        <p>
          En utilisant l'application et en participant aux activités de la chorale, vous acceptez que des photos 
          ou vidéos prises lors des répétitions et concerts puissent être publiées dans l'espace membre de l'application. 
          <em> Pour tout retrait d'une photo vous concernant, contactez le bureau.</em>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Protection des données (RGPD)</h2>
        <p>
          Nous collectons uniquement les données nécessaires au bon fonctionnement de la chorale (nom, prénom, pupitre, email). 
          Ces données ne sont jamais transmises à des tiers. Conformément à la loi, vous disposez d'un droit d'accès 
          et de modification de vos données personnelles.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. Responsabilité</h2>
        <p>
          L'association s'efforce de maintenir l'application à jour, mais ne saurait être tenue responsable 
          des interruptions de service ou des erreurs contenues dans les documents partagés.
        </p>
      </section>

      <footer className="mt-12 pt-6 border-t text-center text-gray-500">
        <p>Pour toute question : <a href="mailto:contact@votrechorale.com" className="text-indigo-600 underline">contact@votrechorale.com</a></p>
      </footer>
    </div>
  );
};

export default ConditionsUtilisation;