
import './accueil.css'
import idimg from './assets/idimg.webp'


function Accueil(){

 

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
               
                    <form action="submit">
                        <div className='formulairecont'>
                            <label htmlFor="idname">Votre Id </label>
                            <input type="text" name="id" id='id' placeholder='Id de connexion' />

                            <label htmlFor="mdp">Votre mot de passe </label>
                            <input type="password" name='mdp' placeholder='Password'/>
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