import {Routes, Route} from "react-router-dom";

import It from "./It";
import CreaCompteUser from "./CreaCompteUser";
import CreatForm from "./CreateForm";

function ITRoutes(){
    return(
        <Routes>
            <Route index element={<It/>}/>
            <Route path="/create" element={<CreaCompteUser/> }/>
            <Route path="/form" element= {<CreatForm />}/>
        

        </Routes>
    )
}

export default ITRoutes