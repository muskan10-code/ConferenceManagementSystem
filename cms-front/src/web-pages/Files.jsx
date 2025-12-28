import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './Files.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Files = () => {
  const navigate = useNavigate(); // Initialize useNavigate for routing
  const [recordedFiles, setRecordedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // File to view in a modal

  // Load recorded files from localStorage on mount
  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('recordedFiles')) || [];
    setRecordedFiles(savedFiles);
  }, []);

  // Delete a specific recording
  const handleDelete = (index) => {
    const updatedFiles = recordedFiles.filter((_, i) => i !== index);
    setRecordedFiles(updatedFiles); // Update state
    localStorage.setItem('recordedFiles', JSON.stringify(updatedFiles)); // Update localStorage
  };

  // Open the modal to view the selected file
  const handleView = (file) => {
    setSelectedFile(file); // Set the file to be viewed in the modal
  };

  // Close the modal
  const closeModal = () => {
    setSelectedFile(null);
  };

  return (
    <>
      <NavBar />
      <button
        className="back-button"
        onClick={() => navigate('/virtual-conference')}
      >
        Back
      </button>
      <div className="files-container">
        <h1>Recorded Files</h1>
        <div className="file-list">
          {recordedFiles.length > 0 ? (
            recordedFiles.map((file, index) => (
              <div key={index} className="file-item">
                <p>{file.name}</p>
                <div className="file-actions">
                  <button onClick={() => handleView(file)}>View</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No files available yet.</p>
          )}
        </div>
      </div>

      {/* Modal for viewing selected file */}
      {selectedFile && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedFile.name}</h2>
            <video
              controls
              src={selectedFile.url}
              style={{ width: '100%', maxWidth: '600px', marginTop: '10px' }}
            ></video>
            <button onClick={closeModal} className="close-modal">
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Files;
