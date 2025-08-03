import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./contexts/Authcontext";


import Sommaire from "./pages/Sommaire/Sommaire";
import "./App.css";
import Accueil from "./pages/Accueil/Accueil";
// import Test from "./pages/test";

import ProtectedRoute from "./Component/ProtectedRoute";
import { ProfilProvider } from "./contexts/ProfilContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProfilProvider>
        <Routes>
          <Route path="/" element={<Accueil />} />
         

          {/* Routes protégées */}
          <Route
            path="/sommaire"
            element={
              <ProtectedRoute>
                <Sommaire />
                {/* <Test/> */}
              </ProtectedRoute>
            }
          />

          {/* Redirection pour les routes inconnues */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </ProfilProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
