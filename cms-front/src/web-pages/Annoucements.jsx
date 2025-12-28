import { useState, useEffect } from "react";
import axios from "axios";
import './Annoucements.css';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [annTitle, setAnnTitle] = useState("");
    const [aMess, setAMess] = useState("");

    const BASEURL = "http://localhost:3002";

    // Fetch announcements from backend
    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get(BASEURL + "/api/announcement");
            setAnnouncements(response.data);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };


    // Add new announcement
    const addAnnouncement = async () => {
        try {
            if (!annTitle || !aMess) {
                alert("Both title and message are required!");
                return;
            }

            await axios.post(BASEURL + "/api/announcement", { ann_title: annTitle, a_mess: aMess });
            setAnnTitle("");
            setAMess("");
            fetchAnnouncements(); // Refresh announcements
        } catch (error) {
            console.error("Error adding announcement:", error);
        }
    };

    // Remove an announcement
    const removeAnnouncement = async (id) => {
        try {
            await axios.delete(BASEURL + `/api/announcement?id=${id}`);
            fetchAnnouncements(); // Refresh announcements
        } catch (error) {
            console.error("Error removing announcement:", error);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    return (
        <div className="announcements-container">
            <h1>Announcements</h1>

            {/* Add Announcement Form */}
            <div className="add-announcement-form">
                <input
                    type="text"
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    placeholder="Announcement Title"
                />
                <textarea
                    value={aMess}
                    onChange={(e) => setAMess(e.target.value)}
                    placeholder="Announcement Message"
                />
                <button onClick={addAnnouncement}>Add Announcement</button>
            </div>

            {/* Announcement Table */}
            <table className="announcements-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Message</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {announcements.map((announcement) => (
                        <tr key={announcement.ann_id}>
                            <td>{announcement.ann_title}</td>
                            <td>{announcement.a_mess}</td>
                            <td>
                                <button onClick={() => removeAnnouncement(announcement.ann_id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Announcements;
