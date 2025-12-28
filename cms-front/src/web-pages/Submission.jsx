import React, { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../components/web-pages-css/submission.css";

const Submission = () => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const BASEURL = "http://localhost:3002";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pname", title);
    formData.append("abstract", abstract);
    formData.append("uid", localStorage.getItem("userId")); // Assuming `userId` is stored here

    try {
      const response = await fetch(BASEURL + "/api/paper", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Paper submitted successfully!");
        setTitle("");
        setAbstract("");
        setFile(null);
        document.getElementById("file").value = "";
      } else {
        const error = await response.json();
        console.error("Error response:", error);
        alert(error.message || "Error submitting paper");
      }
      alert("Paper Submitted");
    } catch (err) {
      console.error("Error submitting paper:", err);
      alert("Paper Submitted.");
    } finally {
      // Reset the form in the `finally` block to ensure it happens in both success and failure cases
      setTitle("");
      setAbstract("");
      setFile(null);

      // Reset the file input field
      const fileInput = document.getElementById("file");
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };



  return (
    <>
      <NavBar />
      <h1>Welcome {localStorage.getItem("username")}!</h1>

      <div className="submission-container">
        <div className="submission-guide">
          <h1>SUBMISSION GUIDE</h1>
          <p>
            <b>Paper Formatting Guidelines:</b>
            <br />
            File Format: Submissions must be in PDF format.
            <br />
            Length: Papers should be between 6 to 12 pages, including
            references, figures, and appendices.
            <br />
            Page Size: Standard A4 or US letter.
            <br />
            Margins: 1-inch margins on all sides.
            <br />
            Font: Use Times New Roman, 12-point font for the main text.
            <br />
            Line Spacing: Single-spaced.
            <br />
            Figures and Tables: Ensure all figures and tables are clear and
            labeled appropriately.
            <br />
            They must be embedded within the text, not submitted separately.
            <br />
            Citations and References: Use the IEEE citation style for
            references.
            <br />
            All sources must be cited properly to avoid plagiarism.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="submission-form">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="abstract">Abstract:</label>
            <textarea
              id="abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="file">Upload Paper (PDF):</label>
            <input
              type="file"
              id="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit">Submit Paper</button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Submission;
