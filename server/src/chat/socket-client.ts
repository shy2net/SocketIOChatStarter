import { Subject } from 'rxjs';
import { Socket } from 'socket.io';

export class SocketClient {
  onDisconnect: Subject<SocketClient> = new Subject<SocketClient>();

  constructor(protected socket: Socket) {
    socket.emit('success');
    socket.on('disconnect', () => {
      this.onDisconnect.next(this);
    });
  }

  joinRoom(roomId: string) {
    this.socket.join(roomId);
  }

  sendMessage(event: string, message: any) {
    return this.socket.emit(event, message);
  }
}
