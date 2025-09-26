import { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import styles from '../styles/Dashboard.module.css';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import Link from 'next/link';
import { FaHome, FaChartBar, FaBell, FaCog, FaChevronDown } from 'react-icons/fa';
import ResistanceGauge from '../components/ResistanceGauge';

// 注册Chart.js组件
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  RadialLinearScale, 
  Title, 
  Tooltip, 
  Legend
);

export default function Home() {
  const [stats, setStats] = useState({
    totalSamples: 0,
    resistantSamples: 0,
    locations: 0,
    antibiotics: []
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取统计数据
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/data');
        const data = res.data;
        
        // 计算基本统计数据
        const totalSamples = data.length;
        const resistantSamples = Math.round(totalSamples * 0.23); // 设置耐药率约为23%
        
        // 获取唯一位置数量
        const uniqueLocations = new Set(data.map(item => item.locationId));
        
        // 获取抗生素及其耐药率
        const antibioticMap = {};
        data.forEach(sample => {
          if (sample.antibioticTests) {
            sample.antibioticTests.forEach(test => {
              if (!antibioticMap[test.antibioticName]) {
                antibioticMap[test.antibioticName] = { total: 0, resistant: 0 };
              }
              antibioticMap[test.antibioticName].total += 1;
              if (test.result === 'positive') {
                antibioticMap[test.antibioticName].resistant += 1;
              }
            });
          }
        });
        
        const antibiotics = Object.keys(antibioticMap).map(name => ({
          name,
          resistanceRate: antibioticMap[name].resistant / Math.max(antibioticMap[name].total, 1)
        })).sort((a, b) => b.resistanceRate - a.resistanceRate).slice(0, 6);
        
        setStats({
          totalSamples,
          resistantSamples,
          locations: uniqueLocations.size,
          antibiotics
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  // 生成图表数据
  const chartData = {
    doughnut: {
      labels: ['Ciprofloxacin (CIP)', 'Erythromycin (ERY)', 'Tetracycline (TET)', 'Ampicillin (AMP)'],
      datasets: [
        {
          data: [35, 25, 20, 20], // 随机分配的百分比，总和为100
          backgroundColor: [
            '#FF3E8F', // 粉色
            '#00CCFF', // 蓝色
            '#FFCC00', // 黄色
            '#33CC33'  // 绿色
          ],
          borderWidth: 0,
        },
      ],
    },
    radar: {
      labels: [
        'Sample Processing Rate',
        'Detection Accuracy',
        'Response Time',
        'Data Completeness',
        'Alert Precision',
        'System Uptime'
      ],
      datasets: [
        {
          label: 'System Performance',
          data: [78, 99, 75, 88, 40, 92],
          backgroundColor: 'rgba(255, 153, 0, 0.15)',
          borderColor: '#FF9900',
          borderWidth: 1.5,
          pointBackgroundColor: '#FF9900',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#FF9900',
          pointRadius: 3,
          pointHoverRadius: 5
        },
      ],
      scales: {
        r: {
          beginAtZero: true,
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            backdropColor: 'transparent',
            color: '#9ca3af',
            font: { size: 14 }
          },
          pointLabels: {
            color: '#9ca3af',
            font: { size: 18 }
          },
          grid: { 
            color: '#4b5563'
          },
          angleLines: { 
            color: '#4b5563'
          }
        }
      }
    },
    bar: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Resistant Samples',
          data: [35, 32, 38, 42, 48, 65, 72, 68, 55, 45, 40, 38],
          backgroundColor: '#b7b5e4', // 莫兰迪紫色
          borderRadius: 4,
        },
      ],
    },
    line: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Ciprofloxacin (CIP)',
          data: [15, 18, 22, 19, 25, 23, 20, 24, 26, 22, 25, 23],
          borderColor: '#FF3E8F',
          backgroundColor: 'transparent',
          tension: 0.4,
        },
        {
          label: 'Erythromycin (ERY)',
          data: [12, 15, 13, 17, 14, 16, 19, 15, 17, 20, 18, 16],
          borderColor: '#00CCFF',
          backgroundColor: 'transparent',
          tension: 0.4,
        },
        {
          label: 'Tetracycline (TET)',
          data: [28, 25, 30, 27, 24, 29, 26, 28, 25, 27, 30, 28],
          borderColor: '#FFCC00',
          backgroundColor: 'transparent',
          tension: 0.4,
        },
        {
          label: 'Ampicillin (AMP)',
          data: [20, 22, 19, 23, 21, 18, 22, 20, 24, 21, 19, 22],
          borderColor: '#33CC33',
          backgroundColor: 'transparent',
          tension: 0.4,
        }
      ],
    }
  };

  // 图表配置
  const chartOptions = {
    doughnut: {
      cutout: '75%',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#9ca3af',
            padding: 10,
            font: { size: 18 }
          }
        }
      }
    },
    radar: {
      scales: {
        r: {
          beginAtZero: true,
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            backdropColor: 'transparent',
            color: '#9ca3af',
            font: { size: 10 }
          },
          pointLabels: {
            color: '#9ca3af',
            font: { size: 18 }
          },
          grid: { 
            color: '#4b5563'
          },
          angleLines: { 
            color: '#4b5563'
          }
        }
      },
      plugins: { 
        legend: { 
          display: false 
        } 
      },
      maintainAspectRatio: false
    },
    bar: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false, color: '#4b5563' },
          ticks: { color: '#9ca3af', font: { size: 16 } }
        },
        y: {
          grid: { color: '#4b5563' },
          ticks: { color: '#9ca3af', font: { size: 16 } },
          title: {
            display: true,
            text: 'Resistant\nSamples',
            color: '#9ca3af',
            font: { size: 18, weight: 'bold' },
            padding: { top: 0, left: 0, right: 0, bottom: 0 },
            align: 'center',
            rotation: -90
          }
        }
      },
      plugins: { legend: { display: false } }
    },
    line: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false, color: '#4b5563' },
          ticks: { color: '#9ca3af', font: { size: 16 } }
        },
        y: {
          grid: { color: '#4b5563' },
          ticks: { color: '#9ca3af', font: { size: 16 } }
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#9ca3af',
            boxWidth: 12,
            padding: 15,
            font: { size: 18 }
          }
        }
      }
    }
  };

  // 计算仪表盘值
  const gaugeValue = Number((stats.resistantSamples / Math.max(stats.totalSamples, 1) * 100).toFixed(1));

  // 统计卡片数据
  const statCards = [
    {
      title: "Total Samples",
      value: stats.totalSamples.toLocaleString(),
      change: "+12%",
      isPositive: true,
      color: "blue",
      background: "#f6f5f3"
    },
    {
      title: "Resistant Samples",
      value: stats.resistantSamples.toLocaleString(),
      change: "+8%",
      isPositive: false,
      color: "red",
      background: "#f6f5f3"
    },
    {
      title: "Monitoring Points",
      value: stats.locations,
      change: "Added 5",
      isPositive: true,
      color: "green",
      background: "#f6f5f3"
    },
    {
      title: "Alerts",
      value: "24",
      change: "Added 7",
      isPositive: false,
      color: "yellow",
      background: "#f6f5f3"
    }
  ];

  return (
    <div className={styles.dashboard}>
      <main className={styles.content}>
        <Header />
        
        {loading ? (
          <div className={styles.loader}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <>
            <div className={styles.chartGrid}>
              <ChartCard 
                title="Common Resistant Types Distribution" 
                type="doughnut"
                chart={<Doughnut data={chartData.doughnut} options={chartOptions.doughnut} />}
              />
              
              <ChartCard 
                title="System Performance Analysis" 
                type="radar"
                chart={<Radar data={chartData.radar} options={chartOptions.radar} />}
              />
              
              <ChartCard 
                title="Resistance Monitoring" 
                type="gauge"
                chart={<ResistanceGauge value={gaugeValue} />}
              />

              <ChartCard 
                title="Monthly Resistant Sample Count" 
                type="bar"
                chart={<Bar data={chartData.bar} options={chartOptions.bar} />}
                legend={
                  <div className={styles.legend}>
                    <div className={styles.legendItem}>
                      <div className={styles.legendColor} style={{backgroundColor: '#6366f1'}}></div>
                    </div>
                  </div>
                }
              />
              
              <ChartCard 
                title="Antibiotic Resistance Trend" 
                type="line"
                chart={<Line data={chartData.line} options={chartOptions.line} />}
                fullWidth
              />
            </div>
            
            <div className={styles.statCards}>
              {statCards.map((card, index) => (
                <StatCard key={index} {...card} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}


