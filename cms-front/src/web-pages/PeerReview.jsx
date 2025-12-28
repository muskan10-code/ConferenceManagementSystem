import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./peer-reveiw.css"; // Your custom CSS for dashboard

// Importing the NavBar and Footer components
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const PeerReviewDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const [papers, setPapers] = useState([]); // Dynamic data from backend
  const [currentPage, setCurrentPage] = useState(1);
  const papersPerPage = 4; // Define how many papers to show per page
  const [loading, setLoading] = useState(true); // Loading state for data fetch
  const [error, setError] = useState(null); // Error state

  // Fetch data from backend on component mount
  useEffect(() => {
    const BASEURL = "http://localhost:3002";
    const fetchData = async () => {
      try {
        const response = await fetch(BASEURL + "/api/paper");
        if (!response.ok) {
          throw new Error("Error fetching papers");
        }
        const data = await response.json();
        // Assuming your data format matches what the component expects
        setPapers(
          data.map((item) => ({
            id: item.id, // Adjust to your database column names
            title: item.title,
            status: item.status,
            author: item.author,
            email: item.email,
            pid: item.pid,
            match: `${item.match}%`, // Assuming you calculate match on the backend
            action: item.status === "Reviewed" ? "Reviewed" : "Review",
          }))
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Logic for pagination
  const indexOfLastPaper = currentPage * papersPerPage;
  const indexOfFirstPaper = indexOfLastPaper - papersPerPage;
  const currentPapers = papers.slice(indexOfFirstPaper, indexOfLastPaper);

  // Navigate to the submission page on edit click
  const handleEditClick = (paperId) => {
    navigate(`/peer-review/submission/${paperId}`);
  };

  // Handle pagination clicks
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {/* NavBar at the top */}
      <NavBar />

      {/* Main Dashboard content */}
      <div className="peer-review-dashboard">
        <h2>Peer Review Dashboard</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Paper Title</th>
                  <th>Author Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPapers.map((paper, index) => (
                  <tr key={index}>
                    <td>{paper.title}</td>
                    <td>{paper.author}</td>
                    <td>
                      {/* <button>{paper.action}</button> */}
                      {/* Edit icon triggers navigation */}
                      {paper.uid != localStorage.getItem("userid") && <span
                        className="action-icons"
                        onClick={() => handleEditClick(paper.pid)}
                      >
                        <i className="fas fa-edit"></i> {/* Edit icon */}
                      </span>
                      }
                    </td>
                  </tr>
                ))}
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
                disabled={indexOfLastPaper >= papers.length}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </>
  );
};

export default PeerReviewDashboard;
