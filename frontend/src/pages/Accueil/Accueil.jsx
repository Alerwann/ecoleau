import { useState } from "react";
import "./accueil.css";
import idimg from "../../assets/idimg.webp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PageLayout from "../../Component/PageLayout/PageLayout";
import { usePasswordDisplay } from "../../Hook/useTogglePassword";

function Accueil() {
  const [identifiant, setIdentifiant] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const { login } = useAuth();

  const { password, setPassword, showPassword, togglePasswordVisibility } =
    usePasswordDisplay();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
 
    try {
      const loginResult = await login(identifiant, password);
      console.log("Connexion réussie !");
      switch (loginResult.user.role) {
        case "it":
          navigate("/it");
          break;
        case "rh":
          navigate("/rh");
          break;
        case "manager":
          navigate("/manager");
          break;
        case "conseiller":
          navigate("/sommaire");
          break;
        default:
          console.error(
            "🚨 SÉCURITÉ - Rôle non reconnu:",
            loginResult.user.role
          );
          console.error("🚨 Utilisateur:", loginResult.user.identifiant);
          alert(
            `Rôle non autorisé: ${loginResult.user.role}. Contactez l'administrateur.`
          );
          navigate("/"); // Retour login
          navigate("/");
      }
    } catch (err) {
      console.error("Erreur login:", err);
      setError(err.message || "Erreur de connexion");

      if (err.message === "Trop de tentatives. Veuillez réessayer plus tard.") {
        setIsDisabled(true);
        // setTimeLeft(0);

        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setIsDisabled(false);
              setError("");
              return 0;
            }
            return prev - 1;
          });
        }, 1000); // ← 1000ms au lieu de 300ms
      }
    }finally{
      
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}'${secs < 10 ? "0" : ""}${secs}`;
  };


  return (
    <div>
      <PageLayout
        title="Écol'eau"
        subtitle="On prend soin de l'environement et pas que..."
        disabledstatut={"attente de connexion"}
      >
        <div className="authcontenair">
          <img src={idimg} alt="icon pour identification" />

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="error">
                {error}
                <span>Temps restant : {formatTime(timeLeft)}</span>
              </div>
            )}

            <div className="formulairecont">
              <label className="labelpass" htmlFor="idname">
                Votre Id{" "}
              </label>
              <input
                type="text"
                value={identifiant}
                id="idname"
                onChange={(e) => setIdentifiant(e.target.value)}
                placeholder="Id de connexion"
                required
                disabled={isDisabled}
              />

              <label className="labelpass" htmlFor="password">
                Votre mot de passe{" "}
              </label>
              <input
                className="password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                disabled={isDisabled}
              />

              <div className="show">
                <button
                  className="showButon"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Cacher 🙈" : "Montrer 👀"}
                </button>
              </div>

              <div className="buttoncontenair">
                <button
                  className="boutonval"
                  type="submit"
                  disabled={isDisabled}
                >
                  Valider
                </button>
              </div>
            </div>
          </form>
        </div>
      </PageLayout>
    </div>
  );
}

export default Accueil;
