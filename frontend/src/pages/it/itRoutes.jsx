import {Routes, Route} from "react-router-dom";

import It from "./It";
import CreaCompteUser from "./CreaCompteUser";

function ITRoutes(){
    return(
        <Routes>
            <Route index element={<It/>}/>
            <Route path="/create" element={<CreaCompteUser/> }/>

        </Routes>
    )
}

export default ITRoutes