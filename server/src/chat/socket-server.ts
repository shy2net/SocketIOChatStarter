import { Server, Socket } from 'socket.io';
import * as socketIO from 'socket.io';

export class SocketServer {
  io: Server;

  init(http: any) {
    this.io = socketIO(http);

    this.io.on('connection', this.onSocketConnect.bind(this));
    console.log('Socket IO is now running');
  }

  onSocketConnect(socket: Socket) {}
}

export default new SocketServer();
