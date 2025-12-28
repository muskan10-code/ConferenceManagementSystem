import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client'; // Import Socket.IO
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import './GoLive.css';
import ChatBox from './ChatBox';

const socket = io('http://localhost:8000');

const GoLive = () => {
  const navigate = useNavigate();
  const [isLive, setIsLive] = useState(false);
  const [isViewer, setIsViewer] = useState(false); // State to track if the user is joining
  const [recordedFiles, setRecordedFiles] = useState([]);
  const [userName, setUserName] = useState('');
  const [activeStreamer, setActiveStreamer] = useState(null); // Track the active streamer
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    // Retrieve username from localStorage
    const loggedInUserName = localStorage.getItem('username');
    if (loggedInUserName) {
      setUserName(loggedInUserName);
    }

    // Load recorded files from localStorage
    const savedFiles = JSON.parse(localStorage.getItem('recordedFiles')) || [];
    setRecordedFiles(savedFiles);

    // Check if there is an active streamer from localStorage (initial load)
    const savedStreamer = localStorage.getItem('activeStreamer');
    if (savedStreamer) {
      setActiveStreamer(savedStreamer);
    }

    // Listen for active streamer updates from the server
    socket.on('updateStreamer', (streamer) => {
      setActiveStreamer(streamer); // Update the active streamer state
      if (!streamer) {
        setIsViewer(false); // Stop viewer mode if the stream ends
        alert('The live stream has ended.');
      }
    });

    // Clean up the socket listener on component unmount
    return () => {
      socket.off('updateStreamer'); // Remove listener to prevent memory leaks
    };
  }, []);

  const saveRecordedFile = (file) => {
    const updatedFiles = [...recordedFiles, file];
    setRecordedFiles(updatedFiles);
    localStorage.setItem('recordedFiles', JSON.stringify(updatedFiles));
  };

  const handleGoLive = async () => {
    if (!userName) {
      alert('Please log in to start the live stream.');
      return;
    }

    if (activeStreamer && activeStreamer !== userName) {
      alert(
        `User ${activeStreamer} is already live. You can join their stream.`,
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'video/webm',
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const fileURL = URL.createObjectURL(blob);
        const fileName = `${userName} recording.webm`;

        saveRecordedFile({ name: fileName, url: fileURL });
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      streamRef.current = stream;

      // Notify other users that this user is live
      socket.emit('startStream', userName);

      setActiveStreamer(userName);
      localStorage.setItem('activeStreamer', userName); // Update local storage
      setIsLive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Failed to access the camera. Please check your permissions.');
    }
  };

  const handleStopLive = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    // Notify other users that the stream has ended
    socket.emit('stopStream');

    setActiveStreamer(null);
    localStorage.removeItem('activeStreamer'); // Remove from local storage
    setIsLive(false);
  };

  const handleJoinLive = () => {
    if (activeStreamer && activeStreamer !== userName) {
      alert(`Joining ${activeStreamer}'s live stream...`);
      setIsViewer(true); // Enable viewer mode
      // Implement the logic for watching the live stream (e.g., WebRTC).
    } else if (activeStreamer === userName) {
      alert('You cannot join your own live stream.');
    } else {
      alert('No live stream is active currently.');
    }
  };

  const handleExitLive = () => {
    setIsViewer(false);
    alert('You have exited the live stream.');
  };

  return (
    <>
      <NavBar />
      <button
        className="back-button"
        onClick={() => navigate('/virtual-conference')}
      >
        Back
      </button>
      <div className="go-live-container">
        <h1>
          {isLive
            ? `You are now LIVE as ${userName}!`
            : activeStreamer
              ? `${activeStreamer} is currently live`
              : 'Ready to Go Live?'}
        </h1>
        <div className="live-video-section">
          <div className="video-frame">
            <video
              ref={videoRef}
              autoPlay
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '20px',
              }}
            ></video>
          </div>
          <div className="live-controls">
            {isLive ? (
              <button className="stop-button" onClick={handleStopLive}>
                Stop Live Stream
              </button>
            ) : activeStreamer ? (
              <>
                <button className="join-button" onClick={handleJoinLive}>
                  Join Now
                </button>
                {isViewer && (
                  <button className="exit-button" onClick={handleExitLive}>
                    Exit Stream
                  </button>
                )}
              </>
            ) : (
              <button className="go-live-button" onClick={handleGoLive}>
                Go Live
              </button>
            )}
          </div>
        </div>
        {(isLive || isViewer) && <ChatBox userName={userName} />}
      </div>
      <Footer />
    </>
  );
};

export default GoLive;
