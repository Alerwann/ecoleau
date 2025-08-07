
import { useCurrentUser } from "../../Hook/profilCurrentUser";
import Loading from "../Loading";
import './PageLayout.css'

function PageLayout({ children, title, subtitle, disabledstatut=false }) {
  const { nom, prenom,  loading, logout } = useCurrentUser();



  if (loading) {
    return <Loading />;
  }
  return (
    <div className="page-layout">
      <header className="page-header">
        <div className="page-header__info">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="page-header__user" >
         <span><h1 className="text-gradient">Bonne journée</h1></span> 
          <span className="user-name text-gradient">
             {nom} {prenom}  
            </span>
          </div>
           
           
          
          {/* <span className="user-role">{role?.toUpperCase()}</span> */}
          <button onClick={logout} className={`btn-danger ${disabledstatut ? 'disabled' : ''}`}>
          Déconnexion</button>
       
      </header>

      <main className="page-content">{children}</main>
    </div>
  );
}

export default PageLayout;
