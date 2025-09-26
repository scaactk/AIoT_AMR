import React from 'react';
import styles from '../styles/Header.module.css';
import { FaBell, FaChevronDown } from 'react-icons/fa';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.titleRow}>
        <h1 className={styles.titleMain}>AMR Monitoring</h1>
        <span className={styles.titleSub}>Antimicrobial Resistance Surveillance System</span>
      </div>
      
      <div className={styles.userArea}>
        <button className={styles.notificationBtn}>
          <FaBell />
          <span>Notifications</span>
        </button>
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>AM</div>
          <FaChevronDown style={{ color: '#9ca3af', fontSize: '0.875rem' }} />
        </div>
      </div>
    </header>
  );
}
