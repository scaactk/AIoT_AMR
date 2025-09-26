import React, { useState } from 'react';
import styles from '../../styles/System.module.css';
import Header from '../../components/Header';
import { FaLock, FaKey, FaHistory, FaShieldAlt } from 'react-icons/fa';

export default function SecuritySettings() {
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    passwordExpiry: '90',
    sessionTimeout: '30',
    ipRestriction: false
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        
        <div className={styles.pageHeader}>
          <h1>Security Settings</h1>
        </div>

        <div className={styles.securityGrid}>
          <div className={styles.securityCard}>
            <div className={styles.cardHeader}>
              <FaLock className={styles.cardIcon} />
              <h2>Two-Factor Authentication</h2>
            </div>
            <div className={styles.cardContent}>
              <label className={styles.switch}>
                <input 
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={(e) => setSettings({...settings, twoFactorAuth: e.target.checked})}
                />
                <span className={styles.slider}></span>
              </label>
              <p>Enable two-factor authentication for enhanced security</p>
            </div>
          </div>

          <div className={styles.securityCard}>
            <div className={styles.cardHeader}>
              <FaKey className={styles.cardIcon} />
              <h2>Password Policy</h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.inputGroup}>
                <label>Password Expiry (days)</label>
                <input 
                  type="number" 
                  value={settings.passwordExpiry}
                  onChange={(e) => setSettings({...settings, passwordExpiry: e.target.value})}
                />
              </div>
              <p>Set password expiration period</p>
            </div>
          </div>

          <div className={styles.securityCard}>
            <div className={styles.cardHeader}>
              <FaHistory className={styles.cardIcon} />
              <h2>Session Management</h2>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.inputGroup}>
                <label>Session Timeout (minutes)</label>
                <input 
                  type="number" 
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
                />
              </div>
              <p>Set automatic session timeout</p>
            </div>
          </div>

          <div className={styles.securityCard}>
            <div className={styles.cardHeader}>
              <FaShieldAlt className={styles.cardIcon} />
              <h2>IP Restriction</h2>
            </div>
            <div className={styles.cardContent}>
              <label className={styles.switch}>
                <input 
                  type="checkbox"
                  checked={settings.ipRestriction}
                  onChange={(e) => setSettings({...settings, ipRestriction: e.target.checked})}
                />
                <span className={styles.slider}></span>
              </label>
              <p>Restrict access to specific IP addresses</p>
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.saveButton}>
            <FaSave /> Save Settings
          </button>
          <button className={styles.resetButton}>
            <FaUndo /> Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
} 