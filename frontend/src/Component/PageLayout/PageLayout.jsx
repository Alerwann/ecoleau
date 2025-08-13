import { useCurrentUser } from "../../Hook/useCurrentUser";
import Loading from "../general/Loading";
import "./PageLayout.css";

function PageLayout({
  children,
  title,
  subtitle,
  disabledstatut = false,
  service,
  affichenom
 
}) {
  const {   nom, prenom,loading, logout } = useCurrentUser();

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="page-layout">
      <header className="page-header">
        <span className="user-name text-gradient">
          {affichenom && <p>{nom} {prenom}</p>}
          
        </span>

        <div className="page-header__user">
          <span>
            <h1 className="text-gradient">{service}</h1>
          </span>
          
            <h1 className="page-header__info">{title}</h1>
            
            {subtitle && <p>{subtitle}</p>}
          
        </div>

        {/* <span className="user-role">{role?.toUpperCase()}</span> */}
        <button
          onClick={logout}
          className={`btn-valide ${disabledstatut ? "disable" : ""}`}
        >
          Déconnexion
        </button>
      </header>

      <main className="page-content">{children}</main>
    </div>
  );
}

export default PageLayout;
