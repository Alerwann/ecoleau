import { Routes, Route } from "react-router-dom";
import RhAccueil from "./RhAccueil";
import UploadCvs from "./UploadCvs";


function RHRoutes() {
  return (
    <Routes>
      <Route index element={<RhAccueil/>} />
      <Route path="/upload" element={<UploadCvs/>}/>
    
    </Routes>
  );
}

export default RHRoutes;