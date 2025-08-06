
import "./listprofil.css";

import CreateForm from './CreateForm'

import { useState } from "react";

function ProfilsList({ profils=[] }) {


  const  [profilNom, setProfilNom]= useState();
  const [profilPrenom,setProfilPrenom]=useState();
  const [role, setRole]=useState()
  const[id, setId]=useState()

  const [choice, setChoice]=useState()

  const handleClick =(_id,nom,prenom,role)=>{
  
    setId(_id);
    setProfilNom(nom);
    setProfilPrenom(prenom);
    setRole(role)
    setChoice(true)
 

  } 
function ChoiceComponent(){
  if(!choice){
   return <h1>Choisi un compte pour continuer</h1>
  }return <CreateForm id={id} nom={profilNom} prenom={profilPrenom} choice={true} role={role}></CreateForm>

}

  if (profils.length === 0) {
    return (
      <div className="no-profils">
        <p>✅ Tous les profils ont déjà un compte !</p>
      </div>
    );
  }

  return (
 
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
            <button onClick={()=>{handleClick(profil._id, profil.nom, profil.prenom, profil.role)}} >Choisir</button>
          </div>
          
        ))}
          <div>
                {/* <h1>formulaire de creation</h1> */}
                <ChoiceComponent />
          
          
          </div>
      
        
      </div>
 
   
  );
}

export default ProfilsList;
