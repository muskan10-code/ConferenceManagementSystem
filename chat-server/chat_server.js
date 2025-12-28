// chat_server.js for Socket.IO integration
const { Server } = require('socket.io');
const cors = require('cors');

const io = new Server(8000, {
  cors: {
    origin: 'http://localhost:3000', // Update this if the client runs on a different origin
    methods: ['GET', 'POST'],
  },
});

const profiles = {};
let activeStreamer = null; // Track the active streamer

io.on('connection', (socket) => {
  // Handle new user joining
  socket.on('new-user-joined', (name) => {
    profiles[socket.id] = name;
    socket.broadcast.emit('user-joined', name); // Broadcast that a user joined
  });

  // Handle incoming messages
  socket.on('send', (message) => {
    socket.broadcast.emit('receive', {
      message: message,
      name: profiles[socket.id],
    });
  });

  // Handle starting a live stream
  socket.on('startStream', (streamerName) => {
    if (!activeStreamer) {
      activeStreamer = streamerName;
      io.emit('updateStreamer', activeStreamer); // Notify all clients of the new active streamer
    } else {
      socket.emit('streamError', `User ${activeStreamer} is already live.`);
    }
  });

  // Handle stopping a live stream
  socket.on('stopStream', () => {
    if (activeStreamer === profiles[socket.id]) {
      activeStreamer = null;
      io.emit('updateStreamer', null); // Notify all clients that the stream has ended
    }
  });

  // Handle user disconnecting
  socket.on('disconnect', () => {
    const userName = profiles[socket.id];
    if (userName === activeStreamer) {
      // If the active streamer disconnects, end the stream
      activeStreamer = null;
      io.emit('updateStreamer', null); // Notify all clients that the stream has ended
    }
    delete profiles[socket.id];
    socket.broadcast.emit('user-left', userName); // Broadcast that a user left
  });
});
