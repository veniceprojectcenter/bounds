'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');

const isAdmin = (hook) => {
  if(!hook.params.user || !hook.params.user.isAdmin) {
    throw new Error('You need to be a logged-in admin!');
  }
}


exports.before = {
  all: [],
  find: [],
  get: [isAdmin],
  create: [isAdmin],
  update: [isAdmin],
  patch: [isAdmin],
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
