import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Mentorship.css";

// MentorCard Component
const MentorCard = ({ mentor }) => {
    return (
        <div className="mentor-card">

            <h3>{mentor.mname}</h3>
            <p>{mentor.dept}</p>
        </div>
    );
};

// MentorForm Component
const MentorForm = ({ mentors }) => {
    const [selectedMentor, setSelectedMentor] = useState('');
    const [topic, setTopic] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const mentor = mentors.find((m) => m.mname === selectedMentor);
        const mid = mentor?.mid || null; // Get mentor ID
        const uid = localStorage.getItem("userId"); // Assuming `userId` is stored in local storage
        console.log(mid);
        try {
            if (!uid || !mid || !topic || !selectedDate || !startTime || !endTime) {
                setMessage("Please fill all fields");
                return;
            }

            const response = await axios.post("http://localhost:3002/api/mentored", {
                uid,
                mid,
                topics: topic,
                date: selectedDate,
                start_time: startTime,
                end_time: endTime,
            });

            setMessage(response.data.message || "Mentorship successfully registered!");
        } catch (error) {
            console.error("Error submitting mentorship:", error);
            setMessage("Failed to submit mentorship. Please try again.");
        }
    };

    return (
        <div className="mentor-form">
            <h2>Mentor Registration</h2>
            <form onSubmit={handleSubmit}>
                <label>Select Mentor</label>
                <select value={selectedMentor} onChange={(e) => setSelectedMentor(e.target.value)}>
                    <option value="">Select Mentor</option>
                    {mentors.map((mentor) => (
                        <option key={mentor.mid} value={mentor.mname}>
                            {mentor.mname}
                        </option>
                    ))}
                </select>

                <label>Topics</label>
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter Topic"
                />

                <label>Select Date</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />

                <label>Start Time</label>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />

                <label>End Time</label>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />

                <button type="submit">Submit</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

// MentorshipComponent
const MentorshipComponent = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await axios.get("http://localhost:3002/api/mentorship");
                setMentors(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching mentors:", error);
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    return (
        <div className="mentorship-container">
            <h1>Mentorship</h1>
            {loading ? (
                <p>Loading mentors...</p>
            ) : (
                <div className="mentorship-content">
                    <div className="mentors-section">
                        <h2>Meet Our Mentors</h2>
                        <div className="mentors-list">
                            {mentors.map((mentor) => (
                                <MentorCard key={mentor.mid} mentor={mentor} />
                            ))}
                        </div>
                    </div>
                    <MentorForm mentors={mentors} />
                </div>
            )}
        </div>
    );
};

export default MentorshipComponent;
