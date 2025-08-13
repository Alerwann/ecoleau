import {
  creatIdentifiant,
  creatPassword,
} from "../../../fonctionUtilitaire/hookCreaUser";

import { useState } from "react";

import AfficheFormComponent from "../../../Component/AfficheFormComponent";
import Loading from "../../../Component/general/Loading";

function ProfilsList({ profils = [] }) {
  const [loading, setLoading] = useState(false);
  const [rhId, setrhId] = useState();
  const [userRole, setUserRole] = useState();
  const [identifiantReq, setIdentifiantReq] = useState();

  const [passwordfinal, setPasswordfinal] = useState();

  const [creaEnd, setCreaEnd] = useState(false);

  if (loading) {
    <Loading />;
  }

  const handleClickMdp = async (id, nom, prenom, role) => {
    let identifant;

    setLoading(true);

    try {
      identifant = await creatIdentifiant(nom, prenom);
    } catch (error) {
      console.log("erruer handle click");
    }

    setrhId(id);
    console.log(role, "role");
    setUserRole(role);
    const password = creatPassword();
    console.log(password, "apres createpassword");
    setPasswordfinal(password);

    console.log(identifant, password, "fin des hooks");

    setIdentifiantReq(identifant);
    setCreaEnd(true);
    setLoading(false);
  };

  console.log(userRole, "apres la validation");

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
        <div key={profil._id} className="card user">
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
          <button
            onClick={() => {
              handleClickMdp(
                profil._id,
                profil.nom,
                profil.prenom,
                profil.role
              );
            }}
          >
            Créer
          </button>
        </div>
      ))}
      <div>
        <AfficheFormComponent
          creaEnd={creaEnd}
          rhId={rhId}
          identifiant={identifiantReq}
          password={passwordfinal}
          role={userRole}
        />
      </div>
    </div>
  );
}

export default ProfilsList;
