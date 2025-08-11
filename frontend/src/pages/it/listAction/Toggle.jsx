import { useState } from "react";
import BackButton from "../../../Component/BackButton";
import { toggleActive } from "../../../services/userServices";
import { useNavigate } from "react-router-dom";

function Toggle({ isActive, identifiant }) {
  const [motif, setMotif] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Nouveau
  const navigate = useNavigate();

  //   console.log(user, "user");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    try {
      await toggleActive(identifiant, motif);
      setSuccessMessage(`Utilisateur ${identifiant} désactivé avec succès !`);
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

  if (isActive === "oui") {
    return (
      <div className="authcontenair">
        {successMessage && (
          <div
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "20px",
              border: "1px solid #c3e6cb",
            }}
          >
            ✅ {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="formulaire-desact">
          <label htmlFor="motif">
            <h2>
              Pourquoi voulez vous désactiver l'agent {identifiant} :<br />
            </h2>

            <textarea
              type="text"
              name="motif"
              id="motif"
              placeholder="Motif(facultatif)"
              rows={5}
              cols={70}
              onChange={(e) => setMotif(e.target.value)}
            />
          </label>
          <button type="submit"> Désactiver l'agent</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <p>{identifiant} est déjà désactivé</p>
        <BackButton chemin="/it" />
      </div>
    );
  }
}
export default Toggle;
