import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

export function connectSocket(userId: string, name: string, role: string, zone: string = 'Main-Campus') {
  if (!socket.connected) {
    socket.connect();
    socket.emit('join-zone', { userId, name, role, zone });
    console.log(`WebSocket connected & joined zone "${zone}" as ${name} (${role})`);
  }
}

export function disconnectSocket() {
  if (socket.connected) {
    socket.disconnect();
    console.log('WebSocket disconnected');
  }
}
