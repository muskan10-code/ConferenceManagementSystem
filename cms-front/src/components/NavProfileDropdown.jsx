import React from "react";
import "./NavBar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const NavProfileDropdown = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const navigate = useNavigate(); // Create navigate instance

  const toggleDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  const handleLogoutClick = () => {
    // Clear user session or token (if stored) here
    window.location.replace(window.location.origin); // Redirect to base URL
  };

  return (
    <div className="profile-drop-down">
      <button className="profile-button" onClick={toggleDropdown}>
        Profile
      </button>
      {dropdownIsOpen && (
        <div className="drop-down">
          <ul className="drop-down-ul">
            <li className="drop-down-li" onClick={handleProfileClick}>
              Profile
            </li>
            <li className="drop-down-li" onClick={handleLogoutClick}>
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavProfileDropdown;
