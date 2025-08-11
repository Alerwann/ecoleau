import { useLocation } from "react-router-dom";
import BackButton from "../../../Component/BackButton";

function Toggle() {
  const location = useLocation();
  const user = location.state?.userData;
  console.log(user, "user");

  if (user.isActive === "non") {
    return (
      <div>
        <form action="">
          <label htmlFor="motif">
            <p>Pourquoi voulez vous désactiver l'agent {user.identifiant}</p>
          </label>

          <input type="text"  id="motif"/>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <p>
          {user.identifiant} est déjà désactivé
        </p>
        <BackButton chemin ='/it'/>
      </div>
    );
  }
}
export default Toggle;
