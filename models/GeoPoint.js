const mongoose = require('mongoose');

const GeoPointSchema = new mongoose.Schema({
  locationId: String,
  name: String,
  coordinates: [Number],
  amrLevel: String,
  lastUpdate: String,
  details: {
    resistance: [String],
    samples: Number,
    positiveRate: String
  }
});

module.exports = mongoose.models.GeoPoint || mongoose.model('GeoPoint', GeoPointSchema); 