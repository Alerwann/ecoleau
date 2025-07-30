import './p.css'
import { logout } from '../../services/api'
import { useNavigate } from 'react-router-dom';







function Page(){
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
    <h1>déconnexion</h1>
    <button onClick={handlelogout}>déconnecté</button>
   </div>
)
}
export default Page