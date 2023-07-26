import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/:username" element={<Profile/>}/>
        <Route path="/messenger" element={<Messenger/>}/>
      </Routes>
    </Router>
  );
}

export default App;
