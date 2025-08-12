// components/Loading.jsx
import loadingGif from '../assets/logoanime.gif'; // Votre GIF

function Loading() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <img 
        src={loadingGif} 
        alt="Chargement..." 
        style={{ width: '380px', height: '380px',borderRadius: '55px'}}
      />
      <p style={{ marginTop: '15px', fontSize: '35px' }}>Vérification en cours...</p>
    </div>
  );
}

export default Loading;