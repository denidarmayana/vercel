// index.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
  const targetWebSocketUrl = 'wss://socket.pasino.io/dice/'; // Ganti dengan URL WebSocket yang diinginkan
  res.writeHead(302, { 'Location': targetWebSocketUrl });
  res.end();
});

wss.on('connection', (ws) => {
  console.log('Klien terhubung ke server WebSocket');

  ws.on('message', (message) => {
    console.log(`Menerima pesan dari klien: ${message}`);
    
    // Kirim balik pesan ke klien
    ws.send(`Halo, ini balasan dari server: ${message}`);
  });

  ws.on('close', () => {
    console.log('Klien terputus dari server WebSocket');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
