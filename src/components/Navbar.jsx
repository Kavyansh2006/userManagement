import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import { useLocation } from "react-router-dom";



function Navbar() {
const location = useLocation();
const isEditMode = location.state;

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <NavLink to="/">Home</NavLink>
        

<NavLink to="/add-user">Add User</NavLink>


        <NavLink to="/about">About Us</NavLink>
      </div>

      {isLoggedIn && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;
