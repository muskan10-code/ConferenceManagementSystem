import React, { useState } from "react";
import Mentors from "./Mentors";
import Announcements from "./Annoucements";
import Conferences from "./Conferences";
import Articles from "./Articles";
import Guides from "./Guides";
import JobBoards from "./JobBoards";
import "./AdminHome.css";

const AdminHome = () => {
    const [activeTab, setActiveTab] = useState("Mentors");

    const renderContent = () => {
        switch (activeTab) {
            case "Mentors":
                return <Mentors />;
            case "Conferences":
                return <Conferences />;
            case "Announcements":
                return <Announcements />;
            case "Articles":
                return <Articles />;
            case "Guides":
                return <Guides />;
            case "Job Boards":
                return <JobBoards />;
            default:
                return <div>Select a Tab</div>;
        }
    };

    const handleLogout = () => {
        // Clear user session data (like removing token, user info, etc)
        localStorage.removeItem("userToken");
        sessionStorage.removeItem("userToken");

        // Redirect the user to the login page
        window.location.replace("/admin");

        // Optionally, you can use history.pushState to block going back to the previous page
        // This will overwrite the session history with the login page, so the user can't go back
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => {
            window.history.pushState(null, "", window.location.href);
        };
    };

    return (
        <div className="admin-home">
            <nav>
                <button onClick={() => setActiveTab("Mentors")}>Mentors</button>
                <button onClick={() => setActiveTab("Conferences")}>Conferences</button>
                <button onClick={() => setActiveTab("Announcements")}>Announcements</button>
                <button onClick={() => setActiveTab("Articles")}>Articles</button>
                <button onClick={() => setActiveTab("Guides")}>Guides</button>
                <button onClick={() => setActiveTab("Job Boards")}>Job Boards</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <div className="content">{renderContent()}</div>
        </div>
    );
};

export default AdminHome;
