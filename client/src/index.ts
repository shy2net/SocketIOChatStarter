import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ChatMessenger } from './chat-messenger';
import { ChatUI } from './chat-ui';

const messenger = new ChatMessenger();
const chatUI = new ChatUI(messenger, `http://localhost:3000`);

chatUI.init();
