'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const isAdmin = require('../../isAdmin');

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [isAdmin],
  update: [isAdmin],
  patch: [hooks.disable('external')],
  remove: [isAdmin]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
