'use strict';

const marker = require('./marker');
const authentication = require('./authentication');
const user = require('./user');
const upload = require('./upload');
const mongoose = require('mongoose');
module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(user);
  app.configure(marker);
  app.configure(upload);
};

