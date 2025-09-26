import mongoose from 'mongoose';

const WarningSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please provide a warning type'],
    trim: true,
  },
  level: {
    type: String,
    required: [true, 'Please provide a warning level'],
    enum: ['High', 'Medium', 'Low'],
  },
  time: {
    type: Date,
    required: [true, 'Please provide a warning time'],
    default: Date.now,
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    trim: true,
  },
  status: {
    type: String,
    required: [true, 'Please provide a status'],
    enum: ['New', 'Resolved'],
    default: 'New',
  },
  details: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Warning || mongoose.model('Warning', WarningSchema); 