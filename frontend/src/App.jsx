import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./navbar/NavBar"
import About from "./about/About";
import Favorites from "./favorites/Favorites";
import Home from "./home/Home";
import Login from "./login/Login";
import Profile from "./profile/Profile";
import Register from "./register/Register";
import Stats from "./stats/Stats";

const App = () => {
 return (
   <div className="App">
    <NavBar />
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/auth" element={<Login />} />
         <Route path="/auth/register" element={<Register />} />
         <Route path="/favorites" element={<Favorites />} />
         <Route path="/about" element={<About />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/player/:name" element={<Stats />} />
       </Routes>
    </div>
 );
};

export default App;




