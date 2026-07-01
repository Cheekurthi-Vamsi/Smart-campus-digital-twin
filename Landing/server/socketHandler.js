import { Server } from 'socket.io';

let io = null;

// Track active student positions: { socketId: { userId, name, role, x, y, z, zone } }
const activeUsers = new Map();

export function initSocketServer(httpServer, corsOptions) {
  io = new Server(httpServer, {
    cors: corsOptions,
    pingTimeout: 60000,
  });

  console.log('WebSocket Server initialized.');

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Join spatial zone or classroom
    socket.on('join-zone', (data) => {
      const { userId, name, role, zone } = data;
      
      // Leave previous zone if any
      const userState = activeUsers.get(socket.id);
      if (userState && userState.zone !== zone) {
        socket.leave(userState.zone);
        socket.to(userState.zone).emit('user-left', { socketId: socket.id, userId: userState.userId });
      }

      socket.join(zone);
      
      const newUserState = {
        socketId: socket.id,
        userId,
        name,
        role,
        zone,
        x: 0,
        y: 0,
        z: 0,
        lastUpdated: Date.now()
      };
      
      activeUsers.set(socket.id, newUserState);
      
      console.log(`User ${name} (${role}) joined zone: ${zone}`);

      // Notify others in the zone
      socket.to(zone).emit('user-joined', newUserState);

      // Send list of all existing users in this zone to the newly connected user
      const usersInZone = Array.from(activeUsers.values()).filter(u => u.zone === zone && u.socketId !== socket.id);
      socket.emit('zone-users', usersInZone);
    });

    // Handle student coordinate updates in 3D space
    socket.on('update-position', (coords) => {
      const { x, y, z } = coords;
      const userState = activeUsers.get(socket.id);
      
      if (userState) {
        userState.x = x;
        userState.y = y;
        userState.z = z;
        userState.lastUpdated = Date.now();
        
        activeUsers.set(socket.id, userState);
        
        // Broadcast new position to everyone else in the same zone
        socket.to(userState.zone).emit('user-moved', {
          socketId: socket.id,
          userId: userState.userId,
          name: userState.name,
          x,
          y,
          z
        });
      }
    });

    // Send a real-time message within a zone (e.g. library chat or department chat)
    socket.on('send-message', (messageData) => {
      const userState = activeUsers.get(socket.id);
      if (userState) {
        const fullMessage = {
          id: `${socket.id}-${Date.now()}`,
          senderName: userState.name,
          senderId: userState.userId,
          role: userState.role,
          message: messageData.text,
          timestamp: new Date().toISOString()
        };
        // Send to all clients in the zone
        io.to(userState.zone).emit('new-message', fullMessage);
      }
    });

    // Broadcast a high-priority campus-wide emergency alert
    socket.on('send-campus-alert', (alertData) => {
      const { title, message, category } = alertData;
      console.log(`[ALERT] Broad-casting emergency alert: "${title}"`);
      io.emit('campus-alert-received', {
        id: `alert-${Date.now()}`,
        title,
        message,
        category,
        timestamp: new Date().toISOString()
      });
    });

    // Broadcast live attendance sync updates
    socket.on('sync-attendance-telemetry', (attendanceData) => {
      const { courseId, studentName, rollNumber } = attendanceData;
      console.log(`[ATTENDANCE] Live telemetry sync for ${studentName} (${rollNumber})`);
      io.emit('live-attendance-update', {
        courseId,
        studentName,
        rollNumber,
        timestamp: new Date().toISOString()
      });
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
      const userState = activeUsers.get(socket.id);
      if (userState) {
        socket.to(userState.zone).emit('user-left', { socketId: socket.id, userId: userState.userId });
        activeUsers.delete(socket.id);
      }
    });
  });
}

// Helper to push updates from express REST routes if needed
export function getIo() {
  return io;
}
