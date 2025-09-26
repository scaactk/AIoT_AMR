import React, { useState } from 'react';
import dashboardStyles from '../../styles/Dashboard.module.css';
import styles from '../../styles/System.module.css';
import Header from '../../components/Header';
import { FaSave, FaSync, FaDownload, FaUpload } from 'react-icons/fa';

export default function DataConfiguration() {
  const [config, setConfig] = useState({
    dataRetention: '90',
    backupFrequency: 'daily',
    exportFormat: 'CSV',
    autoSync: true
  });

  return (
    <div className={dashboardStyles.dashboard}>
      <main className={dashboardStyles.content}>
        <Header />
        
        <div className={styles.pageHeader}>
          <h1>Data Configuration</h1>
        </div>

        <div className={styles.configGrid}>
          <div className={styles.configCard}>
            <h2>Data Retention</h2>
            <div className={styles.inputGroup}>
              <input 
                type="number" 
                value={config.dataRetention}
                onChange={(e) => setConfig({...config, dataRetention: e.target.value})}
              />
              <span>days</span>
            </div>
          </div>

          <div className={styles.configCard}>
            <h2>Backup Frequency</h2>
            <select 
              value={config.backupFrequency}
              onChange={(e) => setConfig({...config, backupFrequency: e.target.value})}
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className={styles.configCard}>
            <h2>Export Format</h2>
            <select 
              value={config.exportFormat}
              onChange={(e) => setConfig({...config, exportFormat: e.target.value})}
            >
              <option value="CSV">CSV</option>
              <option value="JSON">JSON</option>
              <option value="Excel">Excel</option>
            </select>
          </div>

          <div className={styles.configCard}>
            <h2>Auto Sync</h2>
            <label className={styles.switch}>
              <input 
                type="checkbox"
                checked={config.autoSync}
                onChange={(e) => setConfig({...config, autoSync: e.target.checked})}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.saveButton}>
            <FaSave /> Save Configuration
          </button>
          <button className={styles.syncButton}>
            <FaSync /> Sync Now
          </button>
          <button className={styles.exportButton}>
            <FaDownload /> Export Data
          </button>
          <button className={styles.importButton}>
            <FaUpload /> Import Data
          </button>
        </div>
      </main>
    </div>
  );
} 