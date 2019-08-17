import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as io from 'socket.io-client';
const socket = io('http://localhost:3000?username=John');