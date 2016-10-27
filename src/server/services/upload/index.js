'use strict';

const path = require('path');
const hooks = require('./hooks');
const multer = require('multer');
const multipartMiddleware = multer();
const dauria = require('dauria');
const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const blobStorage = fs(path.join(__dirname, '../../../../public/uploads'));

module.exports = function() {
  const app = this;

  
  // Initialize our service with any options it requires
  app.use('/uploads', 
    multipartMiddleware.single('uri'),

    // another middleware, this time to
    // transfer the received file to feathers
    function(req,res,next){
        req.feathers.file = req.file;
        next();
    },

    blobService({Model: blobStorage})
  );

  // Get our initialize service to that we can bind hooks
  const uploadsService = app.service('/uploads');

  // Set up our before hooks
  uploadsService.before(hooks.before);

  // Set up our after hooks
  uploadsService.after(hooks.after);
};
