import { useState } from "react";

import { toggleActive } from "../../../services/userServices";
import { useNavigate } from "react-router-dom";
import Loading from "../../../Component/Loading";
import BackButton from "../../../Component/BackButton";

function Toggle({ isActive, identifiant }) {
  const [motif, setMotif] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [disabledstatut, setDisabledStatut] = useState(false);
  const navigate = useNavigate();

  //   console.log(user, "user");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    try {
      await toggleActive(identifiant, motif);
      if (isActive === "oui") {
        setSuccessMessage(`Utilisateur ${identifiant} désactivé avec succès !`);
      } else {
        setSuccessMessage(`Utilisateur ${identifiant} activé avec succès !`);
      }
      setDisabledStatut(true);
      setTimeout(() => {
        navigate("/it");
      }, 2000);
    } catch (error) {
      console.log(error, "désactivation impossible");
      if (error.response?.status === 404) {
        console.log("Utilisateur introuvable");
      } else if (error.response?.status === 500) {
        console.log("Erreur serveur");
      } else {
        console.log("Désactivation impossible:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="authcontenair">
    

      <form onSubmit={handleSubmit} className="formulaire-desact">
        <label htmlFor="motif">
          <h2>
            Pourquoi voulez vous modifier l'activation de l'agent {identifiant}{" "}
            :<br />
          </h2>

          <textarea
            
            name="motif"
            id="motif"
            placeholder="Motif(facultatif)"
            rows={5}
            cols={70}
            onChange={(e) => setMotif(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className={`btn-valide ${disabledstatut ? "disable" : ""}`}
        >
          {" "}
          Modifier
        </button>
      </form>
        {successMessage && (
        <div className="successMessage">✅ {successMessage}</div>
      )}
      <BackButton chemin="/it" />
    </div>
  );
}

export default Toggle;
