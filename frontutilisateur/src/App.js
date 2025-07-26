import Accueil from './accueil/accueil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Page from './p/p';

function App() {
  return (
     <Router basename='/'>
    <Routes>
      
      <Route path='/' element={<Accueil/>}/>
      <Route path='/page' element={<Page/>}/>
   
      </Routes>
   </Router>)
}

export default App;
