import {Routes , Route} from "react-router-dom";
import Home from "./pages/home";
import Admin from "./pages/admin";
import  History  from "./pages/profile";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/history" element={<History />}></Route>
        </Routes>
    )
}

export default MainRoutes