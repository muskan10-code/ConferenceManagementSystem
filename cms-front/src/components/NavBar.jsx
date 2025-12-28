import React from "react";
import "./NavBar.css";
import NavProfileDropdown from "./NavProfileDropdown";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav>
        <img className="nav-img" src="/images/cms-img.png" alt="video-icon" />
        <NavLink
          className={(e) => {
            return e.isActive ? "black" : "";
          }}
          to="/home"
        >
          <li className="nav-item ">Home</li>
        </NavLink>
        <NavLink
          className={(e) => {
            return e.isActive ? "black" : "";
          }}
          to="/call-for-papers"
        >
          <li className="nav-item">Call For Papers</li>
        </NavLink>
        <NavLink
          className={(e) => {
            return e.isActive ? "black" : "";
          }}
          to="/submission"
        >
          {" "}
          <li className="nav-item">Submission</li>
        </NavLink>
        <NavLink
          className={(e) => {
            return e.isActive ? "black" : "";
          }}
          to="/peer-review"
        >
          <li className="nav-item">Peer Review</li>
        </NavLink>
        <NavLink
          className={(e) => {
            return e.isActive ? "black" : "";
          }}
          to="/schedule-agenda"
        >
          <li className="nav-item">Schedule & Agenda</li>
        </NavLink>
        <NavLink
          className={(e) => {
            return e.isActive ? "black" : "";
          }}
          to="/registration"
        >
          <li className="nav-item">Registration</li>
        </NavLink>
        <NavLink
          className={(e) => {
            return e.isActive ? "black" : "";
          }}
          to="/virtual-conference"
        >
          <li className="nav-item">Virtual Conference</li>
        </NavLink>

        <NavLink
          className={(e) => {
            return e.isActive ? "black" : "";
          }}
          to="/career-development"
        >
          <li className="nav-item">Career Development</li>
        </NavLink>
        <NavLink
          className={(e) => {
            return e.isActive ? "black" : "";
          }}
          to="/mentorship"
        >
          <li className="nav-item">Mentorship</li>
        </NavLink>
        <NavLink
          className={(e) => {
            return e.isActive ? "black" : "";
          }}
          to="/contact-us"
        >
          <li className="nav-item">Contact Us</li>
        </NavLink>

        <NavProfileDropdown />
      </nav>
    </div>
  );
};

export default NavBar;
