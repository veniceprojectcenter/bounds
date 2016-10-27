import hooks from 'feathers-hooks';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import io from 'socket.io-client';
import authentication from 'feathers-authentication/client';


const socket = io('http://bounds.herokuapp.com/');
const app = feathers()
  .configure(hooks())
  .configure(socketio(socket, {timeout: 100000}))
  .configure(authentication({ storage: window.localStorage }));

export default app;
