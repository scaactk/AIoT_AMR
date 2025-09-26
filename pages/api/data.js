import dbConnect from '../../lib/mongodb';
import AMRData from '../../models/AMRData';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      
      // 获取趋势数据
      if (req.query.type === 'trends') {
        const data = await AMRData.aggregate([
          {
            $group: {
              _id: {
                year: { $year: "$timestamp" },
                month: { $month: "$timestamp" },
                bacteriaType: "$bacteriaType",
                antibioticName: "$antibioticTests.antibioticName"
              },
              positiveCount: {
                $sum: {
                  $cond: [{ $eq: ["$antibioticTests.result", "positive"] }, 1, 0]
                }
              },
              totalCount: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              period: { 
                $concat: [
                  { $toString: "$_id.year" }, 
                  "-", 
                  { $toString: "$_id.month" }
                ] 
              },
              bacteriaType: "$_id.bacteriaType",
              antibioticName: "$_id.antibioticName",
              resistanceRate: { 
                $divide: ["$positiveCount", { $max: ["$totalCount", 1] }] 
              }
            }
          }
        ]);
        
        return res.status(200).json(data);
      }
      
      // 获取地理数据
      if (req.query.type === 'geo') {
        const data = await AMRData.aggregate([
          {
            $group: {
              _id: {
                locationId: "$locationId",
                latitude: "$latitude",
                longitude: "$longitude"
              },
              positiveCount: {
                $sum: {
                  $cond: [{ $eq: ["$antibioticTests.result", "positive"] }, 1, 0]
                }
              },
              totalCount: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              locationId: "$_id.locationId",
              latitude: "$_id.latitude",
              longitude: "$_id.longitude",
              resistanceRate: { 
                $divide: ["$positiveCount", { $max: ["$totalCount", 1] }] 
              }
            }
          }
        ]);
        
        return res.status(200).json(data);
      }
      
      // 如果没有指定类型，返回所有数据（但限制返回数量以避免性能问题）
      const data = await AMRData.find({}).limit(1000);
      res.status(200).json(data);
    } catch (error) {
      console.error('Accessing data failed:', error);
      res.status(500).json({ message: 'Accessing data failed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}