import { useEffect, useState } from "react";
import PageLayout from "../../Component/PageLayout/PageLayout";
import { useVerificationPassword } from "../../Hook/useVerificationPassword";
import Loading from "../../Component/general/Loading";
import { changePasswordAPI } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useMultiPasswordDisplay } from "../../Hook/useTogglePassword";

function ChangePassword() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const pwd = useMultiPasswordDisplay();

  // const [newPassword, setNewPassword] = useState("");
  // const [verifPassword, setVerifPassword] = useState("");
  // const [currentPassword, setCurrentPassword] =useState("")
  const [feedback, setFeedback] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { validPassword } = useVerificationPassword(setFeedback);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoading(true);
    try {
      // 🎯 Pour premier login : pas besoin de currentPassword !
      await changePasswordAPI(pwd.current.value, pwd.new.value); // ou juste newPassword

      // Redirection selon le rôle après changement réussi
      switch (user.role) {
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
          navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // 🎯 Utiliser les bonnes valeurs du hook
    const valid = validPassword(
      pwd.new.value,
      pwd.verify.value,
      pwd.current.value
    );
    setIsValid(valid);
  }, [
    pwd.new.value, // Nouveau mot de passe
    pwd.verify.value, // Vérification
    pwd.current.value, // Mot de passe actuel
  ]);

  if (loading) {
    <Loading />;
  }

  return (
    <PageLayout title={"Création du mot de passe"} disabledstatut true>
      <div className="password-change-notice">
        <h2>🔒 Sécurité requise</h2>
        <p>
          Pour votre sécurité, vous devez changer votre mot de passe temporaire
          avant d'accéder au système.
        </p>
        <p>
          <strong>Cette étape est obligatoire.</strong>
        </p>
      </div>

      <form className="formulaire" onSubmit={(e) => handleSubmit(e)}>
        <div className="inputlab">
          <label htmlFor="verifPassword">
            <h2>Mot de passe actuel :</h2>
          </label>
          <input
            type={pwd.current.show ? "text" : "password"}
            value={pwd.current.value}
            onChange={(e) => pwd.current.setValue(e.target.value)}
          />
          <button type="button" onClick={pwd.current.toggle}>
            {pwd.current.show ? "🙈" : "👀"}
          </button>
        </div>

        <div className="inputlab">
          <label htmlFor="newPassord">
            <h2>Saisie le nouveau mot de passe:</h2>
          </label>
          <input
            type={pwd.new.show ? "text" : "password"}
            value={pwd.new.value}
            onChange={(e) => pwd.new.setValue(e.target.value)}
          />
          <button type="button" onClick={pwd.new.toggle}>
            {pwd.new.show ? "🙈" : "👀"}
          </button>
        </div>
        <div className="inputlab">
          <label htmlFor="verifPassword">
            <h2>Vérification du mot de passe:</h2>
          </label>
          <input
            type={pwd.verify.show ? "text" : "password"}
            value={pwd.verify.value}
            onChange={(e) => pwd.verify.setValue(e.target.value)}
          />
          <button type="button" onClick={pwd.verify.toggle}>
            {pwd.verify.show ? "🙈" : "👀"}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        <button className={` btn-valide ${isValid ? "" : "disable"}`}>
          {" "}
          Valider{" "}
        </button>
      </form>

      <div>
        {feedback.map((messages, index) => {
          return <div key={index}>{messages}</div>;
        })}
      </div>
    </PageLayout>
  );
}
export default ChangePassword;
