import { useState } from "react";

import Loading from "../../../Component/general/Loading";
import BackButton from "../../../Component/general/BackButton";

import { useModification } from "../../../Hook/useModification";

function Action({ identifiant, action, role, isActive }) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [motif, setMotif] = useState("");
  const [disabledstatut, setDisabledStatut] = useState(false);
  const [newRole, setNewRole] = useState(role);

  const { toggleAccess, toggleRole } = useModification(
    setSuccessMessage,
    setErrorMessage,
    setDisabledStatut
  );

  const soumition = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (action === "role") {
      if (!motif.trim()) {
        setErrorMessage("Le motif est obligatoire");
        return;
      }
      if (newRole === role) {
        setErrorMessage("Le nouveau rôle doit être différent du rôle actuel");
        return;
      }
    }

    setLoading(true);
    try {
      if (action === "acces") {
        await toggleAccess(identifiant, motif, isActive);
      }

      if (action === "role") {
        await toggleRole(identifiant, motif, newRole);
      }
    } catch (error) {
      console.error("Erreur dans soumition:", error);
      setErrorMessage("Une erreur inattendue s'est produite");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="authcontenair">
      <form className="formulaire-desact" onSubmit={(e) => soumition(e)}>
        <label htmlFor="motif">
          <h2>
            Pourquoi voulez vous modifier :{action} <br /> de l'agent
            {identifiant}:<br />
          </h2>

          <textarea
            name="motif"
            id="motif"
            placeholder={
              action === "role" ? "Motif obligatoire" : "Motif (facultatif)"
            }
            rows={5}
            cols={70}
            onChange={(e) => setMotif(e.target.value)}
          />
        </label>
        {/* uniquement afficher avec le role */}
        {action === "role" && (
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
        )}

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
      {errorMessage && <div className="errorMessage">❌ {errorMessage}</div>}
      <BackButton chemin="/it" />
    </div>
  );
}
export default Action;
