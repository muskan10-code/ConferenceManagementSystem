import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import "./Home.css"; // Custom CSS for the dashboard
import { Calendar, MapPin, Users, Clock } from "lucide-react";

const Home = () => {
  const [conferences, setConferences] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const conferencesPerPage = 4; // Define how many conferences to show per page
  const BASEURL = "http://localhost:3002";

  // Fetch conferences and announcements from your API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = localStorage.getItem("userid");
        const [conferenceResponse, announcementResponse] = await Promise.all([
          fetch(`${BASEURL}/api/conferences?uid=${uid}`), // Fetch conferences
          fetch(`${BASEURL}/api/announcement`), // Fetch announcements
        ]);

        const conferencesData = await conferenceResponse.json();
        const announcementsData = await announcementResponse.json();

        setConferences(conferencesData);
        setAnnouncements(announcementsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Pagination Logic
  const indexOfLastConference = currentPage * conferencesPerPage;
  const indexOfFirstConference = indexOfLastConference - conferencesPerPage;
  const currentConferences = conferences.slice(
    indexOfFirstConference,
    indexOfLastConference
  );

  // Handle pagination clicks
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <NavBar />
      <h1>Welcome {localStorage.getItem("username")}!</h1>
      <div className="conference-dashboard">
        <div className="conf-table">
          <h2>Conference Dashboard</h2>
          <table>
            <thead>
              <tr>
                <th>Conference Name</th>
                <th>Date</th>
                <th>Conference Link</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {currentConferences.length > 0 ? (
                currentConferences.map((conf) => (
                  <tr key={conf.cid}>
                    <td>{conf.conf_name}</td>
                    <td>{conf.date}</td>
                    <td>{conf.conf_link || "N/A"}</td>
                    <td>{conf.type}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No conferences available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <span className="pagination-page">Page {currentPage}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastConference >= conferences.length}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Announcements Card */}
      <div className="cards">
        <Card title="Latest News and Announcements">
          {announcements.length > 0 ? (
            announcements.map((announcement, index) => (
              <div key={index} className="announcement-item">
                <h3>{announcement.ann_title}</h3>
                <p>{announcement.a_mess}</p>
              </div>
            ))
          ) : (
            <p>No announcements available at the moment.</p>
          )}
        </Card>
        <div className="quick-links">
          <h2>Quick Links</h2>
          <div className="quick-links-buttons">
            <a href="/call-for-papers" className="quick-link">
              Call for Papers
            </a>
            <a href="/registration" className="quick-link">
              Registration
            </a>
            <a href="/schedule-agenda" className="quick-link">
              Schedule
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
