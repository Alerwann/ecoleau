import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./contexts/Authcontext";
import { ProfilProvider } from "./contexts/ProfilContext";
import {UsersProvider} from "./contexts/UsersContext";

import Sommaire from "./pages/Sommaire/Sommaire";
import "./App.css";
import Accueil from "./pages/Accueil/Accueil";
import Test from "./pages/test";

import ProtectedRoute from "./Component/ProtectedRoute";
import RoleBasedRoute from "./Component/RoleBaseRoute";


function App() {
  return (
    <Router>
      <AuthProvider>
        <ProfilProvider>
          <Routes>

            <Route path="/" element={<Accueil />} />

       
            <Route path="/sommaire" element={
                <ProtectedRoute>
                  <Sommaire />
                </ProtectedRoute>
              }
            />

            <Route path="/it" element={
              <RoleBasedRoute allowedRoles={['it']}>
                <UsersProvider>
                  <Test/>
                  </UsersProvider>
              </RoleBasedRoute>
            }/>
          
            {/* Redirection pour les routes inconnues */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ProfilProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
