'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [],
  find: [
    //auth.verifyToken(),
    auth.populateUser(),
    //auth.restrictToAuthenticated()
  ],
  get: [
    //auth.verifyToken(),
    auth.populateUser(),
    //auth.restrictToAuthenticated(),
    //auth.restrictToOwner({ ownerField: '_id' })
  ],
  create: [auth.hashPassword(), hooks.remove('isAdmin')],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: '_id' }), 
    hooks.remove('isAdmin')
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: '_id' }),
    hooks.remove('isAdmin')
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: '_id' })
  ]
};

exports.after = {
  all: [hooks.remove('password')],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
