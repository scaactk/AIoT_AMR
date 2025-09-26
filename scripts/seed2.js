import dbConnect from '../lib/mongodb';
import AMRData from '../models/AMRData';

// 生成随机测试数据的函数
function generateRandomData(count = 500) {
  const data = [];
  const antibiotics = [
    'Ampicillin', 'Ciprofloxacin', 'Ceftriaxone', 
    'Tetracycline', 'Gentamicin', 'Trimethoprim'
  ];
  const locations = [
    { id: 'NYC', name: 'New York', lat: 40.7128, lng: -74.0060 },
    { id: 'LON', name: 'London', lat: 51.5074, lng: -0.1278 },
    { id: 'TKY', name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
    { id: 'SYD', name: 'Sydney', lat: -33.8688, lng: 151.2093 },
    { id: 'JHB', name: 'Johannesburg', lat: -26.2041, lng: 28.0473 },
    { id: 'RIO', name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
    { id: 'BEI', name: 'Beijing', lat: 39.9042, lng: 116.4074 },
    { id: 'CAI', name: 'Cairo', lat: 30.0444, lng: 31.2357 },
    { id: 'MOS', name: 'Moscow', lat: 55.7558, lng: 37.6173 },
    { id: 'DEL', name: 'New Delhi', lat: 28.6139, lng: 77.2090 }
  ];
  
  // 生成过去3年的数据
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 3);
  
  for (let i = 0; i < count; i++) {
    const location = locations[Math.floor(Math.random() * locations.length)];
    const bacteriaType = Math.random() > 0.5 ? 'salmonella' : 'campylobactor';
    
    // 随机日期
    const timestamp = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    
    // 随机抗生素测试结果
    const antibioticTests = [];
    for (const antibiotic of antibiotics) {
      if (Math.random() > 0.3) { // 70%的概率包含这个抗生素的测试
        antibioticTests.push({
          antibioticName: antibiotic,
          result: Math.random() > 0.7 ? 'positive' : 'negative'
        });
      }
    }
    
    data.push({
      locationId: location.id,
      latitude: location.lat,
      longitude: location.lng,
      timestamp,
      bacteriaType,
      antibioticTests,
      deviceId: `device-${Math.floor(Math.random() * 100)}`
    });
  }
  
  return data;
}

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    await AMRData.deleteMany({});
    await AMRData.insertMany(generateRandomData());
    
    res.status(200).json({ message: 'Database initialization successful' });
  } catch (error) {
    console.error('Database initialization error:', error);
    res.status(500).json({ message: 'Database initialization failed' });
  }
};

export default handler;
