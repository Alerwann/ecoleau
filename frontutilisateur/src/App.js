import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Accueil from './components/accueil/accueil';
import Page from './components/p/p';


import './App.css';



function App() {
  return (
    <Router basename='/'>
      <Routes>
       
        <Route path='/' element={<Accueil/>} />
        
       
        <Route path='/page' element={<Page/> }/>
        
      
        
        {/* Redirection pour les routes inconnues */}
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;