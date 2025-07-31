import './Sommaire.css'
import { logout } from '../../services/authServices'
import { useNavigate } from 'react-router-dom';







function Sommaire(){
 const navigate = useNavigate();
const handlelogout =async()=>{
    try{
        await logout()
    navigate('/accueil');
    }catch (err){

         throw new Error(err.response?.data?.message || 'impossible');
    }
    
}


return(
   <div className="contenairp">

    <div className="welcome-message">
      
      </div>
    <h1>déconnexion</h1>
    <button onClick={handlelogout}>déconnecté</button>
   
   </div>
)
}
export default Sommaire