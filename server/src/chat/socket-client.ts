import { Subject } from 'rxjs';
import { Socket } from 'socket.io';
import { SocketMessage } from '../../../shared/models/socket-message';
import { UserChatMessage } from '../../../shared/models/user-chat-message';
import SocketManager from './socket-manager';

export class SocketClient {
  /**
   * A subject called once the socket was disconnected.
   *
   * @type {Subject<SocketClient>}
   * @memberof SocketClient
   */
  onDisconnect: Subject<SocketClient> = new Subject<SocketClient>();

  /**
   *The username obtained from the handshake process.
   *
   * @readonly
   * @type {string}
   * @memberof SocketClient
   */
  get username(): string {
    return this.socket.handshake.query.username;
  }

  constructor(protected socket: Socket) {
    socket.emit('success');
    socket.on('disconnect', () => {
      this.onDisconnect.next(this);
    });
    socket.on('message', this.onSocketMessage.bind(this));
  }

  /**
   * Join the user to a specific room.
   * @param roomId
   */
  joinRoom(roomId: string) {
    this.socket.join(roomId);
  }

  /**
   * Sends a message to this specific user socket.
   * @param event
   * @param message
   */
  sendMessage(event: string, message: any) {
    return this.socket.emit(event, message);
  }

  /**
   * Called whenever a socket message was received.
   * @param message
   */
  onSocketMessage(message: SocketMessage) {
    console.log(`User ${this.username}, sent the following message: ${JSON.stringify(message)}`);

    switch (message.type) {
      case 'chat_message':
        const chatMsg = message as UserChatMessage;
        SocketManager.sendChatMessage(chatMsg);
        break;
    }
  }
}
