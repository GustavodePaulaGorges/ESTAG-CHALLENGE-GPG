import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Admin from "./pages/admin";
import History from "./pages/profile";

function MainRoutes() {
  const loggedIn = sessionStorage.getItem("token");
  console.log(loggedIn);
  return (
    <Routes>
      <Route path="/" element={loggedIn ? <Navigate to="/home" /> : <Login/>}></Route>
      <Route
        path="/register"
        element={loggedIn ? <Navigate to="/home" /> : <Register/>}
      ></Route>
      <Route
        path="/home"
        element={loggedIn ? <Home /> : <Navigate to="/" />}
      ></Route>
      <Route
        path="/admin"
        element={loggedIn ? <Admin /> : <Navigate to="/" />}
      ></Route>
      <Route
        path="/history"
        element={loggedIn ? <History /> : <Navigate to="/" />}
      ></Route>
    </Routes>
  );
}

export default MainRoutes;
