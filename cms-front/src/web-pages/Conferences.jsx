import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Conferences.css";

const Conferences = () => {
    const [conferences, setConferences] = useState([]);
    const [newConference, setNewConference] = useState({
        conf_name: "",
        uid: "",
        date: "",
        pid: "",
        type: "attender", // default type
        done_payment: 0,
        sub_date: "",
        pres_date: "",
        conf_link: "",
    });
    const BASEURL = "http://localhost:3002";

    // Fetch conferences data from the backend
    useEffect(() => {
        axios
            .get(BASEURL + "/api/conferences")
            .then((response) => {
                setConferences(response.data);
            })
            .catch((error) => {
                console.error("Error fetching conferences:", error);
            });
    }, []);

    // Add new conference
    const handleAddConference = () => {
        axios
            .post(BASEURL + "/api/conferences", newConference)
            .then(() => {
                // Fetch the updated list of conferences
                return axios.get(BASEURL + "/api/conferences");
            })
            .then((response) => {
                setConferences(response.data);
                setNewConference({
                    conf_name: "",
                    uid: "",
                    date: "",
                    pid: "",
                    type: "attender",
                    done_payment: 0,
                    sub_date: "",
                    pres_date: "",
                    conf_link: "",
                });
            })
            .catch((error) => {
                console.error("Error adding conference:", error);
            });
    };


    // Handle form changes for new conference
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewConference({
            ...newConference,
            [name]: value,
        });
    };

    // Remove a conference
    const handleRemoveConference = (id) => {
        axios
            .delete(`${BASEURL}/api/conferences?id=${id}`)  // Send 'id' as a query parameter
            .then(() => {
                setConferences(conferences.filter((conf) => conf.cid !== id));
            })
            .catch((error) => {
                console.error("Error removing conference:", error);
            });
    };

    return (
        <div className="conferences">
            <h2>Conferences</h2>
            <div className="conference-form">
                <input
                    type="text"
                    name="conf_name"
                    value={newConference.conf_name}
                    onChange={handleChange}
                    placeholder="Conference Name"
                />
                <input
                    type="text"
                    name="uid"
                    value={newConference.uid}
                    onChange={handleChange}
                    placeholder="User ID"
                />
                <input
                    type="date"
                    name="date"
                    value={newConference.date}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="pid"
                    value={newConference.pid}
                    onChange={handleChange}
                    placeholder="Presenter ID"
                />
                <select
                    name="type"
                    value={newConference.type}
                    onChange={handleChange}
                >
                    <option value="attender">Attender</option>
                    <option value="presenter">Presenter</option>
                </select>
                <input
                    type="date"
                    name="sub_date"
                    value={newConference.sub_date}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="pres_date"
                    value={newConference.pres_date}
                    onChange={handleChange}
                />
                <input
                    type="url"
                    name="conf_link"
                    value={newConference.conf_link}
                    onChange={handleChange}
                    placeholder="Conference Link"
                />
                <button onClick={handleAddConference}>Add Conference</button>
            </div>

            <table className="conference-table">
                <thead>
                    <tr>
                        <th>Conference Name</th>
                        <th>User ID</th>
                        <th>Presenter ID</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {conferences.map((conference) => (
                        <tr key={conference.cid}>
                            <td>{conference.conf_name}</td>
                            <td>{conference.uid}</td>
                            <td>{conference.pid}</td>
                            <td>{conference.date}</td>
                            <td>{conference.type}</td>
                            <td>
                                <button onClick={() => handleRemoveConference(conference.cid)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Conferences;
