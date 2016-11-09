'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const dauria = require('dauria');
const isAdmin = require('../../isAdmin');


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
    },

    function(hook) {
      hook.params.s3 = { ACL: 'public-read' }; // makes uploaded files public
    }
  ],
  update: [isAdmin],
  patch: [isAdmin],
  remove: [isAdmin]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [
    (hook) => {
      const markers = hook.app.service('markers');
      let marker_id = hook.params.query.marker_id;
      
      return markers.get(marker_id).then(r => {
        let marker = r;
        if (!marker) {
          hook.result.fail = res;
          return hook;
        }

        var images = marker.images;
        if (images) {
          images.push({src: hook.result.id});
        } else {
          images = [{src: hook.result.id}];
        }

        let res = {images: images};

        return markers.patch(marker_id, res).then(e => {
          hook.result.marker = e;
          return hook;
        });
      });
    }],
  update: [],
  patch: [],
  remove: []
};
