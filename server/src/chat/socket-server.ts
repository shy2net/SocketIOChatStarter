import  SocketManager  from './socket-manager';
import { Server, Socket } from 'socket.io';
import * as socketIO from 'socket.io';
import { SocketClient } from './socket-client';

export class SocketServer {
  io: Server;

  init(http: any) {
    this.io = socketIO(http);

    this.initSocketMiddlewares();
    this.io.on('connection', this.onSocketConnect.bind(this));
    console.log('Socket IO is now running');
  }

  /**
   * Initialize user socket IO middlewares.
   */
  initSocketMiddlewares() {
    this.io.use((socket, next) => {
      const username = socket.handshake.query.username;

      if (!username) return next(new Error(`No username was specified for the handshake process, aborting socket connection!`))
      return next();
    });
  }

  /**
   * Called each time a new socket was connected.
   * @param socket
   */
  onSocketConnect(socket: Socket) {
      // Create a new socket client to handle this connection
      SocketManager.addNewSocket(new SocketClient(socket));
  }
}

export default new SocketServer();
