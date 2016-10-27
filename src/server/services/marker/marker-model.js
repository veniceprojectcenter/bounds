'use strict';

// marker-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markerSchema = new Schema({
  coordinates: { type: Array, required: true },
  number: { type: Array, required: true },
  isPresent: { type: Boolean, required: true },
  coordinates: { type: Array, required: true },
  images: {type: Array, required: true },
  otherData: { type: Object },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const markerModel = mongoose.model('marker', markerSchema);

module.exports = markerModel;