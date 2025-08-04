// pages/IT/components/ProfilsList.jsx
import React from 'react';

function ProfilsList({ profils, selectedProfil, onSelectProfil }) {
  if (profils.length === 0) {
    return (
      <div className="no-profils">
        <p>✅ Tous les profils ont déjà un compte !</p>
      </div>
    );
  }

  return (
    <div className="profils-list">
      {profils.map(profil => (
        <div 
          key={profil._id}
          className={`profil-item ${selectedProfil?._id === profil._id ? 'selected' : ''}`}
          onClick={() => onSelectProfil(profil)}
        >
          <div className="profil-item__header">
            <h3>{profil.prenom} {profil.nom}</h3>
            <span className="profil-item__id">{profil.identifiantRH}</span>
          </div>
          
          <div className="profil-item__info">
            <p className="emploi">{profil.emploi}</p>
            <p className="manager">Manager: {profil.managerNom || 'Non défini'}</p>
          </div>
          
          <div className="profil-item__status">
            <span className="status-badge no-account">Sans compte</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfilsList;