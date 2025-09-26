const axios = require('axios');
import connectDB from '../lib/mongodb.js';

const warnings = [
  // 耐药性警告
  {
    type: 'High Resistance Alert',
    level: 'High',
    time: new Date('2024-03-22T10:30:00'),
    location: 'Hospital A, Lab',
    status: 'New',
    details: 'Critical resistance pattern detected in E. coli samples'
  },
  {
    type: 'Critical Resistance Pattern',
    level: 'High',
    time: new Date('2024-03-22T09:15:00'),
    location: 'Hospital B, ICU',
    status: 'New',
    details: 'Multiple drug resistance detected in Pseudomonas aeruginosa'
  },
  {
    type: 'Multi-drug Resistance Detected',
    level: 'High',
    time: new Date('2024-03-21T16:45:00'),
    location: 'Hospital C, ER',
    status: 'New',
    details: 'Extended spectrum beta-lactamase producing bacteria identified'
  },
  
  // 数据异常警告
  {
    type: 'Data Anomaly Detected',
    level: 'Medium',
    time: new Date('2024-03-21T15:00:00'),
    location: 'Hospital B, ICU',
    status: 'New',
    details: 'Unusual pattern in antibiotic sensitivity test results'
  },
  {
    type: 'Data Sync Issue',
    level: 'Medium',
    time: new Date('2024-03-21T16:45:00'),
    location: 'Hospital D, Lab',
    status: 'New',
    details: 'Data synchronization delay detected'
  },
  {
    type: 'Incomplete Sample Data',
    level: 'Medium',
    time: new Date('2024-03-21T14:20:00'),
    location: 'Hospital A, Lab',
    status: 'New',
    details: 'Missing required fields in sample records'
  },
  
  // 系统警告
  {
    type: 'System Error',
    level: 'Low',
    time: new Date('2024-03-20T09:00:00'),
    location: 'N/A',
    status: 'Resolved',
    details: 'Database connection timeout resolved'
  },
  {
    type: 'Minor System Warning',
    level: 'Low',
    time: new Date('2024-03-20T14:30:00'),
    location: 'N/A',
    status: 'Resolved',
    details: 'Temporary network latency issue'
  },
  {
    type: 'Backup Required',
    level: 'Low',
    time: new Date('2024-03-20T11:00:00'),
    location: 'N/A',
    status: 'New',
    details: 'Scheduled backup pending'
  },
  
  // 设备警告
  {
    type: 'Equipment Calibration Due',
    level: 'Medium',
    time: new Date('2024-03-22T08:00:00'),
    location: 'Hospital A, Lab',
    status: 'New',
    details: 'Automated susceptibility testing system requires calibration'
  },
  {
    type: 'Device Maintenance Required',
    level: 'Medium',
    time: new Date('2024-03-21T13:00:00'),
    location: 'Hospital C, Lab',
    status: 'New',
    details: 'PCR machine maintenance overdue'
  },
  
  // 样本警告
  {
    type: 'Sample Expiration Warning',
    level: 'Low',
    time: new Date('2024-03-22T07:30:00'),
    location: 'Hospital B, Lab',
    status: 'New',
    details: 'Bacterial culture samples approaching expiration date'
  },
  {
    type: 'Sample Contamination Risk',
    level: 'High',
    time: new Date('2024-03-22T10:00:00'),
    location: 'Hospital D, Lab',
    status: 'New',
    details: 'Potential cross-contamination detected in sample processing'
  },
  
  // 合规性警告
  {
    type: 'Compliance Check Required',
    level: 'Medium',
    time: new Date('2024-03-21T15:30:00'),
    location: 'Hospital A, Admin',
    status: 'New',
    details: 'Quarterly compliance review pending'
  },
  {
    type: 'Documentation Update Needed',
    level: 'Low',
    time: new Date('2024-03-20T16:00:00'),
    location: 'Hospital C, Admin',
    status: 'New',
    details: 'Standard operating procedures need updating'
  }
];

async function seedWarnings() {
  try {
    await connectDB();
    for (const warning of warnings) {
      await axios.post('http://localhost:3000/api/warnings', warning);
      console.log(`Added warning: ${warning.type}`);
    }
    console.log('All warnings added successfully!');
  } catch (error) {
    console.error('Error adding warnings:', error);
  }
}

seedWarnings(); 