"use client";
import { useState, useRef } from 'react';

export default function PostVideoPage() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // 1. Gère la sélection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 100 * 1024 * 1024; // 100 Mo

    if (maxSize < file.size) {
      alert("Désolé, votre vidéo ne doit pas faire plus de 100 Mo.");
      e.target.value = ""; 
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  // 2. Gère l'envoi effectif
  const handleFinalUpload = async () => {
    if (!selectedFile || !title) {
      return alert("Veuillez saisir un titre et sélectionner une vidéo valide (>100 Mo).");
    }

    setLoading(true);

    try {
      // ÉTAPE A : Récupérer la signature
      const authRes = await fetch('/api/sign-upload', { method: 'POST' });
      const { signature, timestamp, apiKey, cloudName } = await authRes.json();

      // ÉTAPE B : Upload vers Cloudinary
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', apiKey);
      formData.append('folder', 'user_videos');

      const cldRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        { method: 'POST', body: formData }
      );

      const videoData = await cldRes.json();

      if (!cldRes.ok) {
        throw new Error(videoData.error?.message || "Échec de l'upload Cloudinary");
      }

      // ÉTAPE C : Enregistrement dans MongoDB
      // On utilise videoData (la réponse de Cloudinary) pour remplir notre objet
      if (videoData.secure_url) {
        const dataFromCloudinaryToMongo = {
          title: title.trim(),
          videoUrl: videoData.secure_url,
          cloudinaryId: videoData.public_id,
        };

        const mongodbRes = await fetch("/api/posts", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataFromCloudinaryToMongo)
        });

        const finalResult = await mongodbRes.json();

        if (mongodbRes.ok) {
          alert("Succès ! La vidéo et les infos sont dans MongoDB.");
          // Reset du formulaire
          setTitle("");
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        } else {
          throw new Error(finalResult.error || "Erreur lors de l'enregistrement MongoDB");
        }
      }
    } catch (error) {
      console.error("Erreur détaillée:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto border rounded-xl shadow-lg bg-white mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Publier une vidéo HD</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-1">Titre du Post</label>
        <input 
          type="text" 
          placeholder="Entrez un titre captivant"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-600 mb-1">
          Vidéo (Minimum 100 Mo)
        </label>
        <input 
          ref={fileInputRef}
          type="file" 
          accept="video/*" 
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
          onChange={handleFileChange} 
          disabled={loading} 
        />
        {selectedFile && (
          <p className="mt-2 text-xs text-green-600 font-medium">
            Fichier prêt : {(selectedFile.size / (1024 * 1024)).toFixed(2)} Mo
          </p>
        )}
      </div>

      <button
        onClick={handleFinalUpload}
        disabled={loading || !selectedFile || !title}
        className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-200 
          ${loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-purple-600 hover:bg-purple-700 active:scale-95 shadow-md hover:shadow-purple-200'
          }`}
      >
        {loading ? "Envoi en cours..." : "Publier la vidéo"}
      </button>

      {loading && (
        <p className="mt-4 text-xs text-center text-gray-400 italic">
          Cette opération peut prendre du temps (Fichier {'>'} 100 Mo).
        </p>
      )}
    </div>
  );
}