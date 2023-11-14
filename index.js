const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

let serverpasino
const socket = new WebSocket('wss://socket.pasino.io/dice/');
socket.addEventListener('open', (event) => {
  console.log('Terhubung ke server WebSocket');
  serverpasino = 'connected'
});

// Handle ketika menerima pesan dari server
socket.addEventListener('message', (event) => {
  console.log('Menerima pesan dari server:', event.data);
  serverpasino = 'receive message'
});

// Handle ketika koneksi ditutup
socket.addEventListener('close', () => {
  console.log('Koneksi ditutup');
  serverpasino = 'closed'
});

// Handle kesalahan
socket.addEventListener('error', (event) => {
  console.error('Terjadi kesalahan:', event);
  serverpasino = 'error'
});


app.get('/', (req, res) => {
  res.json({application:"Node js",author:"Deni Darmayana",message:serverpasino});
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server WebSocket berjalan di http://localhost:${PORT}`);
});
