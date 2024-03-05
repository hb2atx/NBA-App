import React, { useState } from 'react'
import { NavLink, Link } from "react-router-dom"
import "./NavBar.css"


 function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
       <Link to="/" className="title">OverPaid: NBA</Link>
       <div className="menu" onClick={() => {
        setMenuOpen(!menuOpen);
       }}>
          <span></span>
          <span></span>
          <span></span>
       </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/favorites">Favorites</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
        <li>
          <NavLink to="/auth/register">Register</NavLink>
        </li>
        <li>
          <NavLink to="/player/:name">Stats</NavLink>
        </li>
        <li>
          <NavLink to="/avg/:position">Avg Stats</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;