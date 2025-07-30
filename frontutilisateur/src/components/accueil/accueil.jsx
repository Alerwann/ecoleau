
import { useState } from 'react';
import './accueil.css'
import idimg from './assets/idimg.webp'
import { useNavigate } from 'react-router-dom';
import  {login}  from '../../services/api';

import {usePasswordDisplay } from '../../Hook/useTogglePassword';



function Accueil(){

        const [identifiant, setIdentifiant] = useState('');
        // const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const navigate = useNavigate();

          const {
                password,
                setPassword,
                showPassword,
                togglePasswordVisibility,
                } = usePasswordDisplay();

       

        const handleSubmit = async (e) => 
            {
                e.preventDefault();
                try 
                {
                    const {user } = await login({ identifiant, password });
                
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
                            <label className='labelpass' htmlFor="idname">Votre Id </label>
                            <input type="text" 
                            value={identifiant} 
                            id='idname'
                            onChange={(e)=>setIdentifiant(e.target.value)} 
                            placeholder='Id de connexion' 
                            required/>

                            <label className='labelpass' htmlFor="password">Votre mot de passe </label>
                            <input className='password'
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <div className="show">
                                 <button className='showButon' type='button' 
                                 onClick={togglePasswordVisibility}
                                 >
                            {showPassword ? 'Cacher 🙈' : 'Montrer 👀'}
                             </button>
                            </div>
                           

                            <div className='buttoncontenair'>
                                <button className='boutonval' type='submit'>Valider</button>
                            </div>
                            
                        </div>
                            
                    </form>
                
               
            </div>
           
        </div>
    )
}


export default Accueil;