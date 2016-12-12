'use strict';

const marker = require('./marker');
const authentication = require('./authentication');
const user = require('./user');
const upload = require('./upload');
const mongoose = require('mongoose');
const polygon = require('./polygon');

const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };  

module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'), options);
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(user);
  app.configure(marker);
  app.configure(upload);
  app.configure(polygon);
};

