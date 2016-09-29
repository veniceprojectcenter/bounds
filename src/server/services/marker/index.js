'use strict';

const service = require('feathers-mongoose');
const marker = require('./marker-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: marker,
    paginate: {
      default: 150,
      max: 150
    }
  };

  // Initialize our service with any options it requires
  app.use('/markers', service(options));

  // Get our initialize service to that we can bind hooks
  const markerService = app.service('/markers');

  // Set up our before hooks
  markerService.before(hooks.before);

  // Set up our after hooks
  markerService.after(hooks.after);
};
