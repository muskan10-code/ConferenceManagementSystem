import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import CalendarApp from "../components/CalendarApp";

const ScheduleAgenda = () => {
  return (
    <>
      <NavBar />
      <h1> Welcome {localStorage.getItem("username")}!</h1>
      <br />
      <br />
      <CalendarApp />
      <Footer />
    </>
  );
};

export default ScheduleAgenda;
