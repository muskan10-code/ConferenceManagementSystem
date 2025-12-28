import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar'; // Adjust the path if needed
import Footer from '../components/Footer'; // Adjust the path if needed
import './PeerReviewSubmission.css'; // Importing the CSS for this page

const PeerReviewSubmission = () => {
    const { paperId } = useParams(); // Get paperId from URL

    // State for slider values
    const [formData, setFormData] = useState({
        clarity: 70,
        quality: 85,
        rigor: 90,
        novelty: 80,
        feedback: '',
    });

    // State for the rating (out of 5 stars)
    const [rating, setRating] = useState(3); // Default to 3 stars

    const handleSliderChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFeedbackChange = (e) => {
        setFormData({ ...formData, feedback: e.target.value });
    };
    const BASEURL = "http://localhost:3002";


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Extract the form data
        const dataToSubmit = {
            pid: paperId, // Paper ID from the URL
            uid: "1", // Replace with the logged-in user's ID
            cow: formData.clarity,
            opq: formData.quality,
            mr: formData.rigor,
            noc: formData.novelty,
            comments: formData.feedback,
            no_of_stars: rating,
        };

        try {
            const response = await fetch(BASEURL + "/api/peerreview", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSubmit),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error:", errorData.message);
                alert("Failed to submit review: " + errorData.message);
                return;
            }

            const result = await response.json();
            console.log("Success:", result);
            alert("Review submitted successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while submitting the review.");
        }
    };


    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    return (
        <>
            {/* Include NavBar */}
            <NavBar />

            <div className="peer-review-submission">
                <h2>Peer Review Submission</h2>

                <div className="content-wrapper">
                    {/* Left section for paper details */}
                    <div className="left-section">
                        <p><strong>Paper Title:</strong> Paper Sample Title</p>
                        <p><strong>Paper ID:</strong> {paperId}</p>
                        <p><strong>Author Name:</strong> Author 1</p>
                        <p><strong>Author Email:</strong> author1@xyz.com</p>
                        <p><strong>Expertise Match:</strong> 80% matches</p>

                        {/* <button className="download-button">Download</button> */}
                    </div>

                    {/* Right section for sliders and form */}
                    <div className="right-section">
                        <form onSubmit={handleSubmit}>
                            {/* Sliders */}
                            <div className="slider-group">
                                <label>Clarity of Writing</label>
                                <input
                                    type="range"
                                    name="clarity"
                                    min="0"
                                    max="100"
                                    value={formData.clarity}
                                    onChange={handleSliderChange}
                                />
                                <span>Is the paper clear and easy to read?</span>
                            </div>

                            <div className="slider-group">
                                <label>Overall Paper Quality</label>
                                <input
                                    type="range"
                                    name="quality"
                                    min="0"
                                    max="100"
                                    value={formData.quality}
                                    onChange={handleSliderChange}
                                />
                                <span>Is the paper clear and easy to read?</span>
                            </div>

                            <div className="slider-group">
                                <label>Methodological Rigor</label>
                                <input
                                    type="range"
                                    name="rigor"
                                    min="0"
                                    max="100"
                                    value={formData.rigor}
                                    onChange={handleSliderChange}
                                />
                                <span>Evaluate the quality and robustness of the research methods.</span>
                            </div>

                            <div className="slider-group">
                                <label>Novelty of Contribution</label>
                                <input
                                    type="range"
                                    name="novelty"
                                    min="0"
                                    max="100"
                                    value={formData.novelty}
                                    onChange={handleSliderChange}
                                />
                                <span>How original or novel is the contribution of this paper?</span>
                            </div>

                            {/* Feedback Section with Star Rating */}
                            <div className="feedback-section">
                                <h3>Give us a feedback!</h3>

                                {/* Star Rating System */}
                                <div className="star-rating">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={star <= rating ? 'star filled' : 'star'}
                                            onClick={() => handleRatingChange(star)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>

                                <textarea
                                    value={formData.feedback}
                                    onChange={handleFeedbackChange}
                                    placeholder="Add your comments about the paper here..."
                                ></textarea>
                            </div>

                            <div className="button-group">
                                <button type="submit">Submit</button>
                                {/* <button type="button" className="clear-button" onClick={() => setFormData({ clarity: 70, quality: 85, rigor: 90, novelty: 80, feedback: '' })}>
                                    Clear Form
                                </button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Include Footer */}
            <Footer />
        </>
    );
};

export default PeerReviewSubmission;
