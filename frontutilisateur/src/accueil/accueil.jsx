
import { useState } from 'react';
import './accueil.css'
import idimg from './assets/idimg.webp'
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';



function Accueil(){

        const [identifiant, setIdentifiant] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const navigate = useNavigate();
 
        const handleSubmit = async (e) => 
            {
                e.preventDefault();
                try 
                {
                    const { token, user } = await login({ identifiant, password });
                    localStorage.setItem('token', token);
                         console.log('Connecté !', user);
                    navigate('/page'); // Redirection après connexion
                } catch (err) 
                {
                    setError(err.message);
                }       
            };

    return(
        <div className='global'>
        
            <div className='title'>
                
               <h1 className='gros'>
                Écol'eau
               </h1>
               <h2 className='petit'>
                On prend soin de l'environement
               </h2>
               <h2 className='petit'>Et pas que...</h2>
            </div>


            <div className="authcontenair">
                <img src={idimg} alt="icon pour identification" />
               
                    <form onSubmit={handleSubmit}>
                        {error && <div className="error">{error}</div>}

                        <div className='formulairecont'>
                            <label htmlFor="idname">Votre Id </label>
                            <input type="text" 
                            value={identifiant} 
                            id='idname'
                            onChange={(e)=>setIdentifiant(e.target.value)} 
                            placeholder='Id de connexion' 
                            required/>

                            <label htmlFor="mdp">Votre mot de passe </label>
                            <input type="password" 
                            id='mdp' 
                            onChange={(e)=>setPassword(e.target.value)} 
                            placeholder='Password'
                            required/>



                            <div className='button'>
                                <button className='boutonval'>Valider</button>
                            </div>
                            
                        </div>
                            
                    </form>
                
               
            </div>
           
        </div>
    )
}


export default Accueil;