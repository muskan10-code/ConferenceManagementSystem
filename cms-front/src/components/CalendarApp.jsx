import React, { useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { jsPDF } from "jspdf"; // Importing jsPDF
import "./CalendarApp.css";

const BASEURL = "http://localhost:3002"; // Your backend URL

function Calendar() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track errors if any

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                // Check if UID exists in localStorage
                const uid = localStorage.getItem("userid");
                if (!uid) {
                    console.error("User ID not found in localStorage.");
                    setError("User ID not found in localStorage.");
                    return;
                }

                // Fetch conferences associated with the user ID using axios
                const response = await axios.get(`${BASEURL}/api/conferences`, {
                    params: { uid }, // Sending the UID as a query parameter
                });

                const data = response.data;
                console.log("Fetched Data: ", data);

                // Map the fetched data into the format required for FullCalendar
                const formattedEvents = data.map((conf) => ({
                    id: conf.cid,
                    title: conf.conf_name,
                    link: conf.conf_link,
                    start: conf.sub_date, // Use your actual date fields here
                    end: conf.pres_date,
                }));

                setEvents(formattedEvents);
            } catch (error) {
                console.error("Error fetching schedule:", error);
                setError("Failed to fetch schedule.");
            } finally {
                setLoading(false); // Stop loading after fetch
            }
        };

        fetchSchedule();
    }, []); // Empty dependency array to run only once when the component mounts

    // Handle loading or error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Export to PDF function
    const exportToPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Conference Schedule", 14, 22);

        let yPosition = 30; // Starting Y position for events
        events.forEach((event) => {
            doc.setFontSize(12);
            doc.text(`Title: ${event.title}`, 14, yPosition);
            doc.text(`Start: ${event.start}`, 14, yPosition + 10);
            doc.text(`End: ${event.end}`, 14, yPosition + 20);
            doc.text(`Link: ${event.link}`, 14, yPosition + 30);
            yPosition += 40;
        });

        doc.save("schedule.pdf"); // Save the document as PDF
    };

    return (
        <div className="calendar-container">
            {/* Export Schedule Button */}
            <button className="export-button" onClick={exportToPDF}>Export Schedule</button>

            {/* FullCalendar Component */}
            <div className="calendar-wrapper">
                <Fullcalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={"dayGridMonth"}
                    headerToolbar={{
                        start: "today prev,next",
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    events={events} // Events dynamically populated
                    height={"80vh"} // Limit the calendar height
                    eventContent={renderEventContent} // Customize event content
                />
            </div>
        </div>
    );
}

// Helper function to show event details on hover
function renderEventContent(eventInfo) {
    return (
        <div className="event-tooltip">
            <div className="event-title">{eventInfo.event.title}</div>
            <div className="event-details">
                <div><strong>Start:</strong> {eventInfo.event.start.toLocaleString()}</div>
                <div><strong>End:</strong> {eventInfo.event.end?.toLocaleString()}</div>
                <div><strong>Link:</strong> <a href={eventInfo.event.extendedProps.link} target="_blank" rel="noopener noreferrer">Conference Link</a></div>
            </div>
        </div>
    );
}

export default Calendar;
