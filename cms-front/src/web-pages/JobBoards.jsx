import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobBoards.css";

const JobBoards = () => {
    const [jobBoards, setJobBoards] = useState([]);
    const [newJobBoard, setNewJobBoard] = useState({
        jname: "",
        j_link: "",
    });
    const BASEURL = "http://localhost:3002";

    // Fetch job boards data from the backend
    useEffect(() => {
        axios
            .get(BASEURL + "/api/jobboard")
            .then((response) => {
                setJobBoards(response.data);
            })
            .catch((error) => {
                console.error("Error fetching job boards:", error);
            });
    }, []);

    // Add new job board
    const handleAddJobBoard = () => {
        axios
            .post(BASEURL + "/api/jobboard", newJobBoard)
            .then(() => {
                // Fetch the updated list of job boards
                return axios.get(BASEURL + "/api/jobboard");
            })
            .then((response) => {
                setJobBoards(response.data);
                setNewJobBoard({
                    jname: "",
                    j_link: "",
                });
            })
            .catch((error) => {
                console.error("Error adding job board:", error);
            });
    };

    // Handle form changes for new job board
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewJobBoard({
            ...newJobBoard,
            [name]: value,
        });
    };

    return (
        <div className="job-boards">
            <h2>Job Boards</h2>
            <div className="job-board-form">
                <input
                    type="text"
                    name="jname"
                    value={newJobBoard.jname}
                    onChange={handleChange}
                    placeholder="Job Name"
                />
                <input
                    type="url"
                    name="j_link"
                    value={newJobBoard.j_link}
                    onChange={handleChange}
                    placeholder="Job Link"
                />
                <button onClick={handleAddJobBoard}>Add Job</button>
            </div>

            <table className="job-board-table">
                <thead>
                    <tr>
                        <th>Job Name</th>
                        <th>Job Link</th>
                    </tr>
                </thead>
                <tbody>
                    {jobBoards.map((job) => (
                        <tr key={job.j_id}>
                            <td>{job.jname}</td>
                            <td>
                                <a href={job.j_link} target="_blank" rel="noopener noreferrer">
                                    {job.j_link}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobBoards;
