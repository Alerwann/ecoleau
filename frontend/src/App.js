import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Sommaire from "./pages/Sommaire/Sommaire";
import "./App.css";
import Accueil from "./pages/Accueil/Accueil";
import ProtectedRoute from "./Component/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
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
      </AuthProvider>
    </Router>
  );
}

export default App;
