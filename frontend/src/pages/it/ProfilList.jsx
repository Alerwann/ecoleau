
import "./listprofil.css";
import { useNavigate } from "react-router-dom";
import Createform from './CreateForm'
import { useState } from "react";

function ProfilsList({ profils }) {

  const navigate = useNavigate()
  const  [profilNom, setProfilNom]= useState();
  const [profilPrenom,setProfilPrenom]=useState();

  const handleClick =(nom,prenom)=>{
  
    
    setProfilNom(nom)
    setProfilPrenom(prenom)
 

  } 


  if (profils.length === 0) {
    return (
      <div className="no-profils">
        <p>✅ Tous les profils ont déjà un compte !</p>
      </div>
    );
  }

  return (
    <div>
      <div className="contenaire-list">
        {profils.map((profil) => (
          <div key={profil._id} className="card-profil">
            <div className="profil-item__header">
              <h3>
                {profil.prenom} {profil.nom}
              </h3>
              <span className="profil-item__id">{profil.identifiantRH}</span>
            </div>
            <div>
              <h2>Entré le : </h2>
              <h4>{profil.dateEntree}</h4>
            </div>
            <button onClick={()=>{handleClick(profil.nom, profil.prenom)}} >Choisir</button>
          </div>
          
        ))}

        <div>
          <h1>fomr</h1>
          <Createform nom={profilNom} prenom={profilPrenom}></Createform>
        </div>
      </div>
 
    </div>
  );
}

export default ProfilsList;
