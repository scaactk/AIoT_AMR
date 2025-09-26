const mongoose = require('mongoose');

const AMRDataSchema = new mongoose.Schema({
  locationId: String,
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
  bacteriaType: { type: String, enum: ['salmonella', 'campylobactor'] },
  antibioticTests: [{
    antibioticName: String,
    result: { type: String, enum: ['positive', 'negative'] }
  }],
  deviceId: String,
  hospitalName: {
    type: String,
    required: [true, 'Hospital name is required'],
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  antibioticName: {
    type: String,
    required: [true, 'Antibiotic name is required'],
  },
  resistanceRate: {
    type: Number,
    required: [true, 'Resistance rate is required'],
    min: 0,
    max: 100,
  }
});

module.exports = mongoose.models.AMRData || mongoose.model('AMRData', AMRDataSchema);

