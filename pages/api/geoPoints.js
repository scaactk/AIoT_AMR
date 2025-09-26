import dbConnect from '../../lib/mongodb';
const GeoPoint = require('../../models/GeoPoint');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      const points = await GeoPoint.find({});
      res.status(200).json(points);
    } catch (error) {
      console.error('Failed to fetch geo points:', error);
      res.status(500).json({ message: 'Failed to fetch geo points' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 