import { User } from './user';
import { SocketMessage } from './socket-message';

export interface UserChatMessage extends SocketMessage {
  user: User;
  to: string;
  message: string;
}
