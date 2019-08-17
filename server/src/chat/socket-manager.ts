import { SocketClient } from './socket-client';
import { UserChatMessage } from '../../../shared/models/user-chat-message';

/**
 * Describes all sockets related to a connected user.
 */
export interface ConnectedUser {
  sockets: SocketClient[];
}

export class SocketManager {
  /**
   * A dictionary of all connected users keyed by their username.
   *
   * @type {{ [index: string] : ConnectedUser }}
   * @memberof SocketManager
   */
  connectedUsers: { [index: string]: ConnectedUser } = {};

  getConnectedUser(username: string) {
    const connectedUser = this.connectedUsers[username] || { sockets: [] };
    this.connectedUsers[username] = connectedUser;
    return this.connectedUsers[username];
  }

  /**
   * Removes a connected socket.
   * @param socket
   */
  removeSocket(socket: SocketClient) {
    const username = socket.username;
    const connectedUser = this.connectedUsers[username];

    // Remove the old socket
    connectedUser.sockets.splice(connectedUser.sockets.indexOf(socket), 1);
  }

  /**
   * Add a new socket by the specified username.
   * @param username
   * @param socket
   */
  addNewSocket(socket: SocketClient) {
    const connectedUser = this.getConnectedUser(socket.username);
    connectedUser.sockets.push(socket);
    socket.onDisconnect.subscribe(this.onSocketDisconnect.bind(this));
  }

  /**
   * Called when a socket was disconnected, removes it and unsubscribes to it's disconnect observable.
   * @param socket
   */
  onSocketDisconnect(socket: SocketClient) {
    this.removeSocket(socket);
    socket.onDisconnect.unsubscribe();
  }

  sendChatMessage(chatMessage: UserChatMessage) {
    const connectedUser = this.connectedUsers[chatMessage.to];

    if (connectedUser) {
      connectedUser.sockets.forEach(socket => {
        socket.sendMessage('chat_message', chatMessage);
      });
    } else {
      // TODO: User is not connected, save data into database and send push notifications
    }
  }
}

export default new SocketManager();
