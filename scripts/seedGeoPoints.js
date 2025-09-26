const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/amr-monitor';

// 定义GeoPoint模型
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

const GeoPoint = mongoose.model('GeoPoint', GeoPointSchema);

// 全球主要医院数据
const hospitals = [
  // 中国
  { name: 'Peking Union Medical College Hospital', coordinates: [116.4074, 39.9042] },
  { name: 'Huashan Hospital', coordinates: [121.4737, 31.2304] },
  { name: 'The First Affiliated Hospital of Sun Yat-sen University', coordinates: [113.2644, 23.1291] },
  { name: 'Peking University First Hospital', coordinates: [116.4074, 39.9042] },
  { name: 'Shanghai Ruijin Hospital', coordinates: [121.4737, 31.2304] },
  
  // 美国
  { name: 'Mayo Clinic - Rochester', coordinates: [-92.4666, 44.0225] },
  { name: 'Cleveland Clinic', coordinates: [-81.6204, 41.4993] },
  { name: 'Johns Hopkins Hospital', coordinates: [-76.5901, 39.2976] },
  { name: 'Massachusetts General Hospital', coordinates: [-71.1062, 42.3601] },
  { name: 'UCSF Medical Center', coordinates: [-122.4194, 37.7749] },
  { name: 'NewYork-Presbyterian Hospital', coordinates: [-73.9419, 40.8401] }, // 纽约
  { name: 'Cedars-Sinai Medical Center', coordinates: [-118.3805, 34.0756] }, // 洛杉矶
  { name: 'Brigham and Women\'s Hospital', coordinates: [-71.1056, 42.3355] }, // 波士顿
  { name: 'Northwestern Memorial Hospital', coordinates: [-87.6205, 41.8947] }, // 芝加哥
  { name: 'Houston Methodist Hospital', coordinates: [-95.3984, 29.7107] }, // 休斯顿
  { name: 'Stanford Health Care', coordinates: [-122.1746, 37.4340] }, // 斯坦福
  { name: 'Mount Sinai Hospital', coordinates: [-73.9527, 40.7898] }, // 纽约
  { name: 'NYU Langone Hospitals', coordinates: [-73.9754, 40.7420] }, // 纽约
  { name: 'Duke University Hospital', coordinates: [-78.9382, 36.0076] }, // 北卡罗来纳
  { name: 'Barnes-Jewish Hospital', coordinates: [-90.2626, 38.6369] }, // 圣路易斯
  
  // 英国
  { name: 'St Thomas\' Hospital', coordinates: [-0.1180, 51.5014] },
  { name: 'Royal London Hospital', coordinates: [-0.0617, 51.5175] },
  { name: 'Manchester Royal Infirmary', coordinates: [-2.2426, 53.4808] },
  { name: 'Queen Elizabeth Hospital Birmingham', coordinates: [-1.8904, 52.4520] },
  
  // 日本
  { name: 'Tokyo University Hospital', coordinates: [139.6503, 35.6762] },
  { name: 'Osaka University Hospital', coordinates: [135.5023, 34.6937] },
  { name: 'Kyoto University Hospital', coordinates: [135.7681, 35.0116] },
  
  // 加拿大
  { name: 'Toronto General Hospital', coordinates: [-79.3832, 43.6532] },
  { name: 'Vancouver General Hospital', coordinates: [-123.1207, 49.2827] },
  { name: 'Montreal General Hospital', coordinates: [-73.5673, 45.5017] },
  
  // 澳大利亚
  { name: 'Royal Melbourne Hospital', coordinates: [144.9631, -37.8136] },
  { name: 'Royal Prince Alfred Hospital', coordinates: [151.2093, -33.8688] },
  { name: 'Royal Brisbane Hospital', coordinates: [153.0251, -27.4698] },
  
  // 新加坡
  { name: 'Singapore General Hospital', coordinates: [103.8198, 1.3521] },
  { name: 'National University Hospital', coordinates: [103.8198, 1.3521] },
  
  // 印度
  { name: 'All India Institute of Medical Sciences', coordinates: [77.2090, 28.6139] },
  { name: 'Apollo Hospitals', coordinates: [72.8777, 19.0760] },
  
  // 韩国
  { name: 'Seoul National University Hospital', coordinates: [126.9780, 37.5665] },
  { name: 'Samsung Medical Center', coordinates: [127.0848, 37.4882] },
  
  // 德国
  { name: 'Charité - Universitätsmedizin Berlin', coordinates: [13.4050, 52.5200] },
  { name: 'University Hospital Heidelberg', coordinates: [8.6724, 49.3988] },
  
  // 法国
  { name: 'Hôpital Pitié-Salpêtrière', coordinates: [2.3522, 48.8566] },
  { name: 'Hôpital Necker-Enfants Malades', coordinates: [2.3522, 48.8566] },
  
  // 瑞士
  { name: 'University Hospital Zurich', coordinates: [8.5417, 47.3769] },
  { name: 'University Hospital Geneva', coordinates: [6.1421, 46.2044] },
  
  // 瑞典
  { name: 'Karolinska University Hospital', coordinates: [18.0711, 59.3293] },
  { name: 'Sahlgrenska University Hospital', coordinates: [11.9746, 57.7089] },
  
  // 荷兰
  { name: 'Erasmus Medical Center', coordinates: [4.9041, 52.3676] },
  { name: 'Academic Medical Center', coordinates: [4.9041, 52.3676] },
  
  // 意大利
  { name: 'Policlinico di Milano', coordinates: [12.4964, 41.9028] },
  { name: 'Ospedale San Raffaele', coordinates: [12.4964, 41.9028] },
  
  // 西班牙
  { name: 'Hospital Clínic de Barcelona', coordinates: [-3.7038, 40.4168] },
  { name: 'Hospital Universitario La Paz', coordinates: [-3.7038, 40.4168] },
 
  // 中美洲及加勒比海
    { name: 'Instituto Nacional de Ciencias Médicas y Nutrición Salvador Zubirán', coordinates: [-99.1860, 19.3142] }, // 墨西哥 墨西哥城
    { name: 'Hospital General de México', coordinates: [-99.1527, 19.4194] }, // 墨西哥 墨西哥城
    { name: 'Centro Médico ABC', coordinates: [-99.2112, 19.3978] }, // 墨西哥 墨西哥城
    { name: 'Hospital Hermanos Ameijeiras', coordinates: [-82.3666, 23.1380] }, // 古巴 哈瓦那
    { name: 'Hospital Clínico Quirúrgico Docente Calixto García', coordinates: [-82.3830, 23.1330] }, // 古巴 哈瓦那
    { name: 'Hospital CIMA San José', coordinates: [-84.1372, 9.9366] }, // 哥斯达黎加 圣何塞
    { name: 'Hospital México', coordinates: [-84.0996, 9.9578] }, // 哥斯达黎加 圣何塞
    { name: 'Hospital Nacional de Niños', coordinates: [-84.0833, 9.9361] }, // 哥斯达黎加 圣何塞
    { name: 'Hospital Santo Tomás', coordinates: [-79.5342, 8.9657] }, // 巴拿马 巴拿马城
    { name: 'Hospital Punta Pacífica', coordinates: [-79.5280, 8.9824] }, // 巴拿马 巴拿马城
    { name: 'Hospital General Plaza de la Salud', coordinates: [-69.9111, 18.4731] }, // 多米尼加共和国 圣多明各
    { name: 'Centro de Diagnóstico Medicina Avanzada y Telemedicina (CEDIMAT)', coordinates: [-69.9300, 18.4800] }, // 多米尼加共和国 圣多明各
    { name: 'Hospital Roosevelt', coordinates: [-90.5517, 14.6133] }, // 危地马拉 危地马拉城
    { name: 'Hospital General San Juan de Dios', coordinates: [-90.5231, 14.6246] }, // 危地马拉 危地马拉城

  // 南美
  { name: 'Hospital das Clínicas da USP', coordinates: [-46.6689, -23.5505] }, // 巴西 圣保罗
  { name: 'Hospital Israelita Albert Einstein', coordinates: [-46.6934, -23.5991] }, // 巴西 圣保罗
  { name: 'Hospital Alemán', coordinates: [-58.4108, -34.6037] }, // 阿根廷 布宜诺斯艾利斯
  { name: 'Hospital Italiano de Buenos Aires', coordinates: [-58.4192, -34.6103] }, // 阿根廷
  { name: 'Clínica Alemana de Santiago', coordinates: [-70.6056, -33.4172] }, // 智利 圣地亚哥
  { name: 'Hospital Nacional Dos de Mayo', coordinates: [-77.0428, -12.0621] }, // 秘鲁 利马
  { name: 'Hospital Pablo Tobón Uribe', coordinates: [-75.5906, 6.2706] }, // 哥伦比亚 麦德林
  { name: 'Hospital Universitario Fundación Santa Fe de Bogotá', coordinates: [-74.0628, 4.6584] }, // 哥伦比亚 波哥大

  // 非洲
  { name: 'Groote Schuur Hospital', coordinates: [18.4655, -33.9410] }, // 南非 开普敦
  { name: 'Chris Hani Baragwanath Hospital', coordinates: [27.8311, -26.2708] }, // 南非 约翰内斯堡
  { name: 'Kenyatta National Hospital', coordinates: [36.8065, -1.3001] }, // 肯尼亚 内罗毕
  { name: 'Mulago National Referral Hospital', coordinates: [32.5825, 0.3382] }, // 乌干达 坎帕拉
  { name: 'Korle Bu Teaching Hospital', coordinates: [-0.2280, 5.5500] }, // 加纳 阿克拉
  { name: 'Cairo University Hospitals', coordinates: [31.2357, 30.0444] }, // 埃及 开罗
  { name: 'University Teaching Hospital Lusaka', coordinates: [28.2937, -15.4167] }, // 赞比亚 卢萨卡
  { name: 'Hospital Central de Maputo', coordinates: [32.5732, -25.9653] }, // 莫桑比克 马普托
];

// 生成随机AMR数据
function generateRandomAMRData() {
  const resistanceTypes = [
    'Penicillin',
    'Cephalosporins',
    'Carbapenems',
    'Aminoglycosides',
    'Fluoroquinolones',
    'Tetracyclines',
    'Macrolides',
    'Sulfonamides',
    'Trimethoprim',
    'Polymyxins'
  ];

  const amrLevels = ['Low', 'Medium', 'High'];
  const randomResistance = resistanceTypes
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3) + 1);

  return {
    amrLevel: amrLevels[Math.floor(Math.random() * amrLevels.length)],
    lastUpdate: new Date().toISOString().split('T')[0],
    details: {
      resistance: randomResistance,
      samples: Math.floor(Math.random() * 200) + 50,
      positiveRate: `${Math.floor(Math.random() * 40 + 10)}%`
    }
  };
}

// 生成医院缩写
function generateHospitalAbbr(hospitalName) {
  // 移除特殊字符和空格
  const cleanName = hospitalName.replace(/[^a-zA-Z0-9]/g, '');
  // 获取前4-6个字符作为缩写
  return cleanName.substring(0, Math.min(6, cleanName.length)).toUpperCase();
}

// 主函数：连接数据库并插入数据
async function seedGeoPoints() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // 清空现有数据
    await GeoPoint.deleteMany({});
    console.log('Cleared existing data');

    // 插入新数据
    const geoPoints = hospitals.map(hospital => ({
      locationId: `LOC-${generateHospitalAbbr(hospital.name)}-2024`,
      name: hospital.name,
      coordinates: hospital.coordinates,
      ...generateRandomAMRData()
    }));

    await GeoPoint.insertMany(geoPoints);
    console.log(`Successfully inserted ${geoPoints.length} geo points`);

    // 关闭数据库连接
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding geo points:', error);
    process.exit(1);
  }
}

// 执行脚本
seedGeoPoints(); 