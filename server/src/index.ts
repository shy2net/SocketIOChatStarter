import * as express from 'express';
import SocketServer from './chat/socket-server';

// Initalize express
const app = express();

// Initialize HTTP required for express
const http = require('http');
const httpServer = http.Server(app);

// Initialzie the socket server
SocketServer.init(httpServer);

// Start listening
httpServer.listen(3000);
console.log(`Server is now listening on port 3000...`);
