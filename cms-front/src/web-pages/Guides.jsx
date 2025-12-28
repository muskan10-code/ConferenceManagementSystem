import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Guides.css";

const Guides = () => {
    const [guides, setGuides] = useState([]);
    const [newGuide, setNewGuide] = useState({
        g_name: "",
        g_link: "",
    });

    const BASEURL = "http://localhost:3002";

    // Fetch guides data from the backend
    useEffect(() => {
        axios
            .get(BASEURL + "/api/guide")
            .then((response) => {
                setGuides(response.data);
            })
            .catch((error) => {
                console.error("Error fetching guides:", error);
            });
    }, []);

    // Add new guide
    const handleAddGuide = () => {
        if (!newGuide.g_name || !newGuide.g_link) {
            alert("Both fields are required!");
            return;
        }

        axios
            .post(BASEURL + "/api/guide", newGuide)
            .then(() => {
                // Fetch the updated list of guides after adding the new one
                axios
                    .get(BASEURL + "/api/guide")
                    .then((response) => {
                        setGuides(response.data); // Update the guides state with the new data
                    })
                    .catch((error) => {
                        console.error("Error fetching updated guides:", error);
                    });

                // Clear the form fields
                setNewGuide({
                    g_name: "",
                    g_link: "",
                });
            })
            .catch((error) => {
                console.error("Error adding guide:", error);
            });
    };

    // Handle form changes for new guide
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGuide((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="guides">
            <h2>Guides</h2>
            <div className="guide-form">
                <input
                    type="text"
                    name="g_name"
                    value={newGuide.g_name}
                    onChange={handleChange}
                    placeholder="Guide Name"
                />
                <input
                    type="url"
                    name="g_link"
                    value={newGuide.g_link}
                    onChange={handleChange}
                    placeholder="Guide Link"
                />
                <button onClick={handleAddGuide}>Add Guide</button>
            </div>

            <table className="guide-table">
                <thead>
                    <tr>
                        <th>Guide Name</th>
                        <th>Guide Link</th>
                    </tr>
                </thead>
                <tbody>
                    {guides.map((guide) => (
                        <tr key={guide.g_id}>
                            <td>{guide.g_name}</td>
                            <td>
                                <a href={guide.g_link} target="_blank" rel="noopener noreferrer">
                                    {guide.g_link}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Guides;
