const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Store connected clients
const connectedClients = new Set();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  connectedClients.add(socket.id);

  // Handle stopwatch events
  socket.on('startStopwatch', (data) => {
    socket.broadcast.emit('stopwatchStarted', data);
  });

  socket.on('stopStopwatch', (data) => {
    socket.broadcast.emit('stopwatchStopped', data);
  });

  socket.on('resetStopwatch', (data) => {
    socket.broadcast.emit('stopwatchReset', data);
  });

  socket.on('addLap', (data) => {
    socket.broadcast.emit('lapAdded', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    connectedClients.delete(socket.id);
  });
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/connected-clients', (req, res) => {
  res.json({ count: connectedClients.size });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend will be available at http://localhost:5173`);
  console.log(`Backend API available at http://localhost:${PORT}/api`);
}); 