import { User } from './user';

export interface UserMessage {
  user: User;
  to: string;
  message: string;
}
