import React, { useState, useEffect } from "react";
import "./Mentors.css"; // Import the CSS file

const Mentors = () => {
    const [mentors, setMentors] = useState([]);
    const [newMentor, setNewMentor] = useState({
        mname: "",
        dept: "",
        aoe: "",
    });

    useEffect(() => {
        fetchMentors();
    }, []);
    const BASEURL = "http://localhost:3002";

    const fetchMentors = async () => {
        try {
            const response = await fetch(BASEURL + "/api/mentorship");
            if (!response.ok) {
                throw new Error("Failed to fetch mentors");
            }
            const data = await response.json();
            setMentors(data);
        } catch (error) {
            console.error("Error fetching mentors:", error);
        }
    };

    const addMentor = async () => {
        if (!newMentor.mname || !newMentor.dept || !newMentor.aoe) {
            alert("All fields are required!");
            return;
        }
        try {
            const response = await fetch(BASEURL + "/api/mentorship", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMentor),
            });
            if (!response.ok) {
                throw new Error("Failed to add mentor");
            }
            fetchMentors();
            setNewMentor({ mname: "", dept: "", aoe: "" });
        } catch (error) {
            console.error("Error adding mentor:", error);
        }
    };

    const removeMentor = async (mid) => {
        try {
            const response = await fetch(BASEURL + `/api/mentorship?id=${mid}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to remove mentor");
            }
            fetchMentors();
        } catch (error) {
            console.error("Error removing mentor:", error);
        }
    };

    return (
        <div className="mentors-container">
            <h2>Mentors</h2>
            <table className="mentors-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Area of Expertise</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mentors.map((mentor) => (
                        <tr key={mentor.mid}>
                            <td>{mentor.mid}</td>
                            <td>{mentor.mname}</td>
                            <td>{mentor.dept}</td>
                            <td>{mentor.aoe}</td>
                            <td>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeMentor(mentor.mid)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="add-mentor-form">
                <h3>Add Mentor</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addMentor();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Name"
                        value={newMentor.mname}
                        onChange={(e) =>
                            setNewMentor({ ...newMentor, mname: e.target.value })
                        }
                        required
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        value={newMentor.dept}
                        onChange={(e) =>
                            setNewMentor({ ...newMentor, dept: e.target.value })
                        }
                        required
                    />
                    <input
                        type="text"
                        placeholder="Area of Expertise"
                        value={newMentor.aoe}
                        onChange={(e) =>
                            setNewMentor({ ...newMentor, aoe: e.target.value })
                        }
                        required
                    />
                    <button type="submit" className="add-btn">
                        Add Mentor
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Mentors;
