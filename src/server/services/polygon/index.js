'use strict';

const SUM_CENSUS_FIELDS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11", "P12", "P13", "P14", "P15", "P16", "P17", "P18", "P19", "P20", "P21", "P22", "P23", "P24", "P25", "P26", "P27", "P28", "P29", "P30", "P31", "P32", "P33", "P34", "P35", "P36", "P37", "P38", "P39", "P40", "P41", "P42", "P43", "P44", "P45", "P46", "P47", "P48", "P49", "P50", "P51", "P52", "P53", "P54", "P55", "P56", "P57", "P58", "P59", "P60", "P61", "P62", "P64", "P65", "P66", "P128", "P129", "P130", "P131", "P132", "P135", "P136", "P137", "P138", "P139", "P140", "ST1", "ST2", "ST3", "ST4", "ST5", "ST6", "ST7", "ST8", "ST9", "ST10", "ST11", "ST12", "ST13", "ST14", "ST15", "A2", "A3", "A5", "A6", "A7", "A44", "A46", "A47", "A48", "PF1", "PF2", "PF3", "PF4", "PF5", "PF6", "PF7", "PF8", "PF9", "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12", "E13", "E14", "E15", "E16", "E17", "E18", "E19", "E20", "E21", "E22", "E23", "E24", "E25", "E26", "E27", "E28", "E29", "E30", "E31"];
const SUM_WORK_FIELDS = ["NUM_UNITA", "ADDETTI", "ALTRI_RETRIB", "VOLONTARI"];

const service = require('feathers-mongoose');
const polygon = require('./polygon-model');

module.exports = function() {
  const app = this;

  app.post('/regionInfo', (req, res) => {
    let match = { 
      $match: {
        centroid: {
          $geoWithin: {
            $geometry: req.body
          }
        }
      } 
    };

    let groupedFields = {
      _id: null,
      area: { $sum: "$area" }
    };

    SUM_CENSUS_FIELDS.forEach(item => {
      groupedFields[item] = { $sum: "$census." + item };
    });

    SUM_WORK_FIELDS.forEach(item => {
      groupedFields[item] = { $sum: "$work." + item };
    });

    let group = { 
      $group: groupedFields
    };

    polygon.aggregate([match, group]).exec().then((response) => {
      let result = [];
      if (response && response.length > 0) {
        result = response[0];
      }

      res.json(result);
    });
  });
};
