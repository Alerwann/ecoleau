import { useState } from "react";
import Loading from "../../../../Component/Loading";
import BackButton from "../../../../Component/BackButton";
import { changeRole } from "../../../../services/userServices";
import { useNavigate } from "react-router-dom";

function RoleModification({ role, identifiant }) {
  const navigate = useNavigate();
  const [newRole, setNewRole] = useState(role);
  const [motif, setMotif] = useState();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabledstatut, setDisabledStatut] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    setSuccessMessage("");
    setErrorMessage("")

      if (!motif.trim) {
      setErrorMessage("Le motif est obligatoire");
      return;
    }

  

    if (newRole === role) {
      setErrorMessage("Le nouveau rôle doit être différent du rôle actuel");
      return;
    }

setLoading(true);

    try {
      await changeRole(identifiant, newRole, motif);
      setSuccessMessage(`Le role a été modifier en ${newRole}`);
      setDisabledStatut(true);
      setTimeout(() => {
        navigate("/it");
      }, 2000);
    } catch (error) {
      console.log(error, "modification impossible");
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
            Pourquoi voulez vous modifier le role ({role}) de l'agent {identifiant}  ?
            <br />
          </h2>

          <textarea
            name="motif"
            id="motif"
            placeholder="Motif obligatoire"
            rows={5}
            cols={70}
            onChange={(e) => setMotif(e.target.value)}
          />
        </label>

        <label htmlFor="roles">
          <h2>Quel est le nouveau role?</h2>
          <select
            defaultValue={role}
            id="roles"
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="conseiller">Conseiller</option>
            <option value="manager">Manager</option>
            <option value="it">I.T</option>
            <option value="rh">RH</option>
          </select>
        </label>
        <button
          type="submit"
          className={`btn-valide ${disabledstatut ? "disable" : ""}`}
        >
          Modifier
        </button>
      </form>
      {errorMessage && (
        <div className="errorMessage">❌ {errorMessage}</div>
      )}
      {successMessage && (
        <div className="successMessage">✅ {successMessage}</div>
      )}
      <BackButton chemin="/it" />
    </div>
  );
}
export default RoleModification;
