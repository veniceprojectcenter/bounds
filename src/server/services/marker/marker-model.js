'use strict';

// marker-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sizeNested = new Schema({
  height: String,
  width: String
}, { _id: false });

const sideNested = new Schema({
  baseSize: sizeNested,
  ringSize: sizeNested,
  spireSize: sizeNested
}, { _id: false });

const markerSchema = new Schema({
  coordinates: { type: Array, required: true },
  address: { type: String },
  clockwiseNorthDelta: { type: String },
  number: { type: String, required: true },
  isPresentInBook: { type: Boolean },
  images: {type: Array },
  otherData: { type: Object },
  driving: { type: Object },
  transit: { type: Object },
  images: { type: Array },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now },
  sides: Object,
  spireHeight: { type: String },
  hasPlatform: { type: Boolean },
  isVisited: { type: Boolean },
  accessibility: { type: Number }
});

const markerModel = mongoose.model('marker', markerSchema);

module.exports = markerModel;