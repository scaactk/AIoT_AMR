import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import dashboardStyles from '../styles/Dashboard.module.css';
import styles from '../styles/Trends.module.css';
import Header from '../components/Header';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Trends() {
  const [selectedAntibiotic, setSelectedAntibiotic] = useState('All');
  const [timeRange, setTimeRange] = useState('6months');
  const [loading, setLoading] = useState(true);

  // Sample data - in real application, this would come from an API
  const antibiotics = ['All', 'Penicillin', 'Cephalosporins', 'Tetracycline', 'Aminoglycosides', 'Macrolides'];
  
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Resistance Rate',
        data: [35, 38, 42, 40, 45, 43],
        borderColor: '#b7b5e4',
        backgroundColor: 'rgba(183, 181, 228, 0.18)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const comparisonData = {
    labels: ['Hospital A', 'Hospital B', 'Hospital C', 'Hospital D', 'Hospital E'],
    datasets: [
      {
        label: 'Current Month',
        data: [45, 38, 42, 35, 40],
        backgroundColor: '#a3c1ad'
      },
      {
        label: 'Previous Month',
        data: [42, 35, 38, 32, 37],
        backgroundColor: '#b7b5e4'
      }
    ]
  };

  const chartOptions = {
    line: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Monthly Resistance Rate Trend'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Resistance Rate (%)'
          }
        }
      }
    },
    bar: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Hospital Comparison'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Resistance Rate (%)'
          }
        }
      }
    }
  };

  return (
    <div className={dashboardStyles.dashboard}>
      <main className={dashboardStyles.content}>
        <Header />
        
        <div className={styles.controls}>
          <div className={styles.selectGroup}>
            <label>Antibiotic Type:</label>
            <select 
              value={selectedAntibiotic}
              onChange={(e) => setSelectedAntibiotic(e.target.value)}
              className={styles.select}
            >
              {antibiotics.map(antibiotic => (
                <option key={antibiotic} value={antibiotic}>
                  {antibiotic}
                </option>
              ))}
            </select>
          </div>
          
          <div className={styles.selectGroup}>
            <label>Time Range:</label>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={styles.select}
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>

        <div className={styles.charts}>
          <div className={styles.chartCard}>
            <Line data={monthlyData} options={chartOptions.line} />
          </div>
          
          <div className={styles.chartCard}>
            <Bar data={comparisonData} options={chartOptions.bar} />
          </div>
        </div>

        <div className={styles.insights}>
          <h2>Key Insights</h2>
          <div className={styles.insightCards}>
            <div className={styles.insightCard}>
              <h3>Trend Analysis</h3>
              <p>Resistance rates have shown a slight upward trend over the past 6 months, with a 2.3% increase in overall resistance.</p>
            </div>
            <div className={styles.insightCard}>
              <h3>Regional Comparison</h3>
              <p>Hospital A shows the highest resistance rates, while Hospital D maintains the lowest rates among monitored facilities.</p>
            </div>
            <div className={styles.insightCard}>
              <h3>Recommendations</h3>
              <p>Consider implementing stricter antibiotic stewardship programs in facilities showing higher resistance rates.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
