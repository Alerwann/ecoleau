
import { useState } from 'react';
import './accueil.css'
import idimg from '../../assets/idimg.webp'
import { useNavigate } from 'react-router-dom';
import  { useAuth } from '../../Hook/useAuth'

import {usePasswordDisplay } from '../../Hook/useTogglePassword';



function Accueil(){

        const [identifiant, setIdentifiant] = useState('');
        const [error, setError] = useState('');
        const navigate = useNavigate();
        const [isDisabled, setIsDisabled] = useState(false);
        const [timeLeft, setTimeLeft] = useState(0);

         const { login } = useAuth();

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
                    const { token, user } = await login({ identifiant, password });
                    localStorage.setItem('token', token);
                         console.log('Connecté !', user);
                    navigate('/sommaire'); // Redirection après connexion
                } catch (err) 
                { 
                    setError(err.message);
                  
                    if (err.message==='Trop de tentatives. Veuillez réessayer plus tard.'){
                        
                    setIsDisabled(true)
                    setTimeLeft(300)

                    const timer =setInterval(()=>{
                        setTimeLeft(prev =>{
                            if(prev<=1){
                                clearInterval(timer)
                                setIsDisabled(false)
                                setError(null);
                                return 0
                            }
                            return prev -1
                        });
                    },300)
                }
                }       
            };


       const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}'${secs < 10 ? '0' : ''}${secs}`;
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
                        {error && <div className="error">{error}  
                            <span >Temps restant : {formatTime(timeLeft)}</span>
                            </div>}
                    

                        <div className='formulairecont'>
                            <label className='labelpass' htmlFor="idname">Votre Id </label>
                            <input type="text" 
                            value={identifiant} 
                            id='idname'
                            onChange={(e)=>setIdentifiant(e.target.value)} 
                            placeholder='Id de connexion' 
                            required
                            disabled={isDisabled}
                            />

                            <label className='labelpass' htmlFor="password">Votre mot de passe </label>
                            <input className='password'
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isDisabled}
                            />

                            <div className="show">
                                 <button className='showButon' type='button' 
                                 onClick={togglePasswordVisibility}
                                 >
                            {showPassword ? 'Cacher 🙈' : 'Montrer 👀'}
                             </button>
                            </div>
                           

                            <div className='buttoncontenair'>
                                <button className='boutonval' type='submit'
                                disabled={isDisabled}>Valider</button>
                            </div>
                            
                        </div>
                            
                    </form>
                
               
            </div>
           
        </div>
    )
}


export default Accueil;