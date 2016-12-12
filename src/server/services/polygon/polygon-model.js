'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const polygonSchema = new Schema({
  sez2011: { type: Number, required: true },
  area: { type: Number },
  tract: { type: Object },
  centroid: { type: Object },
  census: { type: Object },
  comune: { type: String }
});
polygonSchema.index({centroid: '2dsphere'});

const polygonModel = mongoose.model('polygon', polygonSchema);

module.exports = polygonModel;