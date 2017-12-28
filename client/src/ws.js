const io = require('socket.io-client');

const socket = io();

export function listenToResources() {
  socket.on('resources', (data) => {
    console.log('SOCKET IO RESOURCES:', data);
  });
}
