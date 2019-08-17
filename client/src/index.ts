import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as io from 'socket.io-client';

import chatUI from './chat-ui';

const socket = io('http://localhost:3000?username=John');

chatUI.init();
chatUI.addChatMessage('System', 'WELCOME! Please type in your username before we start');
