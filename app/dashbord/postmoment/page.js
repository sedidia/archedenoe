"use client";
import { useState, useRef } from 'react';

export default function PostMoment() {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    date: '',
    location: '',
    description: '',
    entryType: 'Libre'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return alert("Veuillez sélectionner une image pour l'affiche.");
    
    setLoading(true);

    try {
      // ÉTAPE A : Récupérer la signature
      const authRes = await fetch('/api/sign-moment', { method: 'POST' });
      const { signature, timestamp, apiKey, cloudName } = await authRes.json();

      // ÉTAPE B : Upload vers Cloudinary
      const cldFormData = new FormData();
      cldFormData.append('file', selectedImage);
      cldFormData.append('api_key', apiKey);
      cldFormData.append('timestamp', timestamp);
      cldFormData.append('signature', signature);
      cldFormData.append('folder', 'moment_posters');

      const cldRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: cldFormData }
      );

      const imageData = await cldRes.json();
      if (!cldRes.ok) throw new Error("Échec de l'upload Cloudinary");

      // ÉTAPE C : Fusion des infos Cloudinary avec formData et envoi API
      const payload = {
        ...formData,
        imageUrl: imageData.secure_url,    // L'URL de l'image
        cloudinaryId: imageData.public_id, // L'ID pour pouvoir la supprimer plus tard
      };

      const res = await fetch('/api/moments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), // On envoie l'objet complet ici
      });

      if (res.ok) {
        alert("Moment enregistré avec succès !");
        // Reset complet
        setFormData({ date: '', location: '', description: '', entryType: 'Libre' });
        setSelectedImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur lors de l'enregistrement BDD");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            
            {/* Sélection de l'image */}
            <div className="col-12 mb-3">
              <label className="form-label fw-bold small text-primary">Affiche du Moment</label>
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*" 
                className="form-control shadow-sm" 
                onChange={handleImageChange}
                disabled={loading}
              />
              {selectedImage && (
                <div className="mt-2 p-2 bg-light rounded border d-flex align-items-center">
                  <i className="bi bi-image me-2 text-primary"></i>
                  <span className="small text-truncate">{selectedImage.name}</span>
                </div>
              )}
            </div>

            

            {/* Date et Heure */}
            <div className="col-md-6">
              <label className="form-label fw-bold small">Date</label>
              <input 
                type="date" name="date" className="form-control shadow-sm" required
                value={formData.date} onChange={handleChange}
                disabled={loading}
              />
            </div>
            

            {/* Lieu */}
            <div className="col-12">
              <label className="form-label fw-bold small">Lieu / Endroit</label>
              <div className="input-group shadow-sm">
                <span className="input-group-text bg-white"><i className="bi bi-geo-alt text-danger"></i></span>
                <input 
                  type="text" name="location" className="form-control border-start-0" 
                  placeholder="Ex: Cathédrale ou Salle des fêtes" required
                  value={formData.location} onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Type d'entrée */}
            <div className="col-12">
              <label className="form-label fw-bold small">Type de moment</label>
              <select 
                className="form-select shadow-sm" name="entryType" 
                value={formData.entryType} onChange={handleChange}
                disabled={loading}
              >
                <option value="Libre">Culte de dimanche</option>
                <option value="Payant">En tournage</option>
                <option value="Payant">Lors d'une invitation</option>
              </select>
            </div>

            {/* Détails */}
            <div className="col-12">
              <label className="form-label fw-bold small">Détails supplémentaires</label>
              <textarea 
                name="description" className="form-control shadow-sm" rows="3"
                placeholder="Précisions sur le programme..."
                value={formData.description} onChange={handleChange}
                disabled={loading}
              ></textarea>
            </div>

            {/* Bouton de validation */}
            <div className="col-12 mt-4">
              <button 
                type="submit" 
                className="btn btn-primary w-100 py-3 fw-bold shadow transition-all"
                disabled={loading}
              >
                {loading ? (
                  <><span className="spinner-border spinner-border-sm me-2"></span>Traitement en cours...</>
                ) : (
                  <><i className="bi bi-check-circle me-2"></i>Enregistrer le moment</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}