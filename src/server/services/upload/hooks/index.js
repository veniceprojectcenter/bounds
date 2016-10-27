'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    function(hook) {
        if (!hook.data.uri && hook.params.file){
            const file = hook.params.file;
            const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
            hook.data = {uri: uri};
        }
    }
  ],
  update: [],
  patch: [],
  remove: []
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
