import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../web-pages/ChatBox.css";

const socket = io("http://localhost:8000"); // Ensure this matches your server

const ChatBox = ({ userName }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (userName) {
      // Emit the event that the user has joined the chat
      socket.emit("new-user-joined", userName);

      // Listen for incoming messages from the server
      socket.on("receive", (data) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          `${data.name}: ${data.message}`,
        ]);
      });

      // Listen for new user joining notifications
      socket.on("user-joined", (joinedUserName) => {
        if (joinedUserName !== userName) {
          setMessages((prevMessages) => [
            ...prevMessages,
            `${joinedUserName} joined the chat`,
          ]);
        }
      });

      // Listen for user leaving notifications
      socket.on("user-left", (leftUserName) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          `${leftUserName} left the chat`,
        ]);
      });

      return () => {
        // Notify server the user has disconnected
        socket.emit("user-left", userName);

        // Clean up listeners on component unmount
        socket.off("receive");
        socket.off("user-joined");
        socket.off("user-left");
      };
    }
  }, [userName]); // Dependency is the userName

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("send", message); // Emit "send" event to the server
      setMessages((prevMessages) => [...prevMessages, `Me: ${message}`]); // Display the sent message
      setMessage(""); // Clear input field
    }
  };

  return (
    <div>
      <div className="message-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.startsWith("Me:") ? "send" : "incoming"}`}
          >
            {msg}
          </div>
        ))}
      </div>

      <div className="send-button">
        <form onSubmit={sendMessage} id="send-container">
          <input
            type="text"
            id="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit" id="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
