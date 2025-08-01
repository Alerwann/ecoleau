import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./contexts/Authcontext";
import { UserProvider } from "./contexts/UserContext";

import Sommaire from "./pages/Sommaire/Sommaire";
import "./App.css";
import Accueil from "./pages/Accueil/Accueil";

import ProtectedRoute from "./Component/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
        <Routes>
          <Route path="/" element={<Accueil />} />

          {/* Routes protégées */}
          <Route
            path="/sommaire"
            element={
              <ProtectedRoute>
                <Sommaire />
              </ProtectedRoute>
            }
          />

          {/* Redirection pour les routes inconnues */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
