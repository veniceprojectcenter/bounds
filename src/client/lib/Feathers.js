import hooks from 'feathers-hooks';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import io from 'socket.io-client';
import authentication from 'feathers-authentication/client';
import {URL} from './Constants'


const socket = io(URL);
const app = feathers()
  .configure(hooks())
  .configure(socketio(socket, {timeout: 100000}))
  .configure(authentication({ storage: window.localStorage }));

export default app;
