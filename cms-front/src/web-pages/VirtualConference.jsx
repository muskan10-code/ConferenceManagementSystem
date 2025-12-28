import React from "react";
import NavBar from "../components/NavBar"; // Reuse NavBar
import Footer from "../components/Footer"; // Reuse Footer
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./VirtualConference.css"; // Import the CSS for styling

const VirtualConference = () => {
  const navigate = useNavigate(); // Initialize useNavigate for routing

  return (
    <>
      {/* Include Navbar */}
      <NavBar />

      <div className="virtual-conference-container">
        <h1>Welcome to the One Step Virtual Conference!</h1>

        <div className="icon-section">
          {/* Live Section */}
          <div className="icon-wrapper" onClick={() => navigate("/go-live")}>
            <i className="fas fa-video"></i>
            <p>LIVE</p>
          </div>

          {/* Q&A Section */}
          <div className="icon-wrapper">
            <i className="fas fa-users"></i>
            <p>Q&A</p>
          </div>

          {/* Files Section */}
          <div className="icon-wrapper" onClick={() => navigate("/files")}>
            <i className="fas fa-folder-open"></i>
            <p>FILES</p>
          </div>
        </div>
      </div>

      {/* Include Footer */}
      <Footer />
    </>
  );
};

export default VirtualConference;
