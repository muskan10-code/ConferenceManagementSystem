import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer-list">
        <NavLink
          className={(e) => {
            return e.isActive ? '' : '';
          }}
          to="/contact-us"
        >
          <li className="footer-item">Contact Us</li>
        </NavLink>
        <NavLink
          className={(e) => {
            return e.isActive ? '' : '';
          }}
          to="/career-development"
        >
          <li className="footer-item">Career Development</li>
        </NavLink>

        <li className="footer-item">
          Developers @ University of Texas at Arlington
        </li>
      </ul>
    </div>
  );
};

export default Footer;
