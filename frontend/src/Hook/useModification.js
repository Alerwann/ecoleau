import { toggleActive } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { changeRole } from "../services/userServices";

export const useModification = (
  setSuccessMessage,
  setErrorMessage,
  setDisabledStatut
) => {
  const navigate = useNavigate();

  const toggleAccess = async (identifiant,motif, isActive ) => {
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
      console.log(error, "modification impossible");

      if (error.response?.status === 404) {
        setErrorMessage("Utilisateur introuvable");
      } else if (error.response?.status === 500) {
        setErrorMessage("Erreur serveur");
      } else {
        setErrorMessage(error.message || "Modification impossible");
      }
    }
  };

  const toggleRole = async (identifiant, motif, newRole) => {
    try {
      await changeRole(identifiant, newRole, motif);
      setSuccessMessage(`Le role a été modifier en ${newRole}`);
      setDisabledStatut(true);
      setTimeout(() => {
        navigate("/it");
      }, 2000);
    } catch (error) {
      if (error.response?.status === 404) {
        setErrorMessage("Utilisateur introuvable");
      } else if (error.response?.status === 500) {
        setErrorMessage("Erreur serveur");
      } else {
        setErrorMessage(error.message || "Modification impossible");
      }
    }
  };

  return { toggleRole, toggleAccess };
};
