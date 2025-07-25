import Accueil from './accueil/accueil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
     <Router basename='/'>
    <Routes>
      
      <Route path='/' element={<Accueil/>}/>
   
      </Routes>
   </Router>)
}

export default App;
