import { Routes, Route } from "react-router-dom";
import RhAccueil from "./RhAccueil";



function RHRoutes() {
  return (
    <Routes>
      <Route index element={<RhAccueil/>} />
    
    </Routes>
  );
}

export default RHRoutes;