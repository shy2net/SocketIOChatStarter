import * as io from 'socket.io-client';

export class ChatMessenger {
  private _socket: SocketIOClient.Socket;

  get socket(): SocketIOClient.Socket {
    return this._socket;
  }

  constructor() {}

  connect(host: string, username: string): Promise<SocketIOClient.Socket> {
    return new Promise((resolve, reject) => {
      this._socket = io(`${host}/?username=${username}`, {
        autoConnect: false
      });

      this._socket.once('connect', () => {
        return resolve(this._socket);
      });

      this._socket.connect();
    });
  }

  disconnect() {
    return this._socket.disconnect();
  }
}
