import React, { useEffect, useState } from "react";
import Footer from "../components/Footer.jsx";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import "../components/web-pages-css/CallForPapersCSS.css";

const CallForPapers = () => {
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
          <h1> Welcome {localStorage.getItem("username")}</h1>
          <h2>This web page is for call for papers</h2>
          <section className="call-for-papers">
            <h2>Call for Papers</h2>
            <p>
              We invite researchers, practitioners, and innovators to submit
              their latest work in the field of Artificial Intelligence for AI
              Conference 2024.
            </p>

            <h3>Submission Guidelines</h3>
            <ul>
              <li>Papers should be original and not previously published</li>
              <li>Maximum length: 8 pages (including references)</li>
              <li>Format: PDF, following the ACM conference template</li>
              <li>
                Double-blind review process: Please remove all author
                information
              </li>
            </ul>

            <h3>Important Dates</h3>
            <ul>
              <li>Paper Submission Deadline: March 15, 2024</li>
              <li>Notification of Acceptance: May 1, 2024</li>
              <li>Camera-ready Submission: June 1, 2024</li>
              <li>Conference Dates: August 10-12, 2024</li>
            </ul>

            <h3>Submissions Portal</h3>
            <p>
              Please submit your papers through our{" "}
              <NavLink to="/submission" style={{ color: "black" }}>
                {" "}
                Submission Portal
              </NavLink>
            </p>

            <h3>FAQs</h3>
            <details>
              <summary>What topics are accepted?</summary>
              <p>
                We welcome submissions on all aspects of AI, including but not
                limited to: Machine Learning, Natural Language Processing,
                Computer Vision, Robotics, AI Ethics, and AI Applications in
                various domains.
              </p>
            </details>
            <details>
              <summary>Can I submit more than one paper?</summary>
              <p>
                Yes, you may submit multiple papers. However, each paper will be
                reviewed independently.
              </p>
            </details>
            <details>
              <summary>Is there a separate track for student papers?</summary>
              <p>
                We do not have a separate student track, but we encourage
                students to submit their work. High-quality student papers will
                be considered for a Best Student Paper award.
              </p>
            </details>
            <details>
              <summary>What if I miss the submission deadline?</summary>
              <p>
                Late submissions will not be accepted. Please ensure you submit
                your paper before the deadline.
              </p>
            </details>
          </section>
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

export default CallForPapers;
