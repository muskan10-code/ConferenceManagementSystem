import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import MentorshipComponent from "../components/MentorshipComponent";

const Mentorship = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(isLoggedIn);
  }, []);

  return (
    <>
      {loggedIn ? (
        <>
          <NavBar />
          <h1> Welcome {localStorage.getItem("username")}!</h1>
          <h2> This web page is for Mentorship</h2>
          <MentorshipComponent />
          <Footer />
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Page Not Available</h1>
          <p>You must log in to access this page.</p>
        </div>
      )}
    </>
  );
};

export default Mentorship;
