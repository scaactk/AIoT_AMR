import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';
import { 
  FaHome, 
  FaChartBar, 
  FaBell, 
  FaCog,
  FaUsers,
  FaDatabase,
  FaShieldAlt,
  FaChevronDown
} from 'react-icons/fa'; // 导入图标

export default function Sidebar() {
  const [isGroupOpen, setIsGroupOpen] = useState(true); // Data Monitoring 默认展开
  const [isSystemOpen, setIsSystemOpen] = useState(false); // System Management 默认收起

  const toggleGroup = () => {
    setIsGroupOpen(!isGroupOpen);
  };
  const toggleSystem = () => {
    setIsSystemOpen(!isSystemOpen);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h1>Navigation</h1>
      </div>
      <nav className={styles.nav}>
        <Link href="/" className={`${styles.navItem} ${styles.navItemActive}`}>
          <FaHome className={styles.navIcon} /> <span>Dashboard</span>
        </Link>
        <div className={`${styles.navGroup} ${isGroupOpen ? styles.open : ''}`}>
          <div className={styles.navGroupTitle} onClick={toggleGroup}>
            Data Monitoring
            <FaChevronDown className={styles.navIcon} />
          </div>
          <div className={styles.navGroupItems} style={{ display: isGroupOpen ? 'block' : 'none' }}>
            <Link href="/trends" className={styles.navItem}>
              <FaChartBar className={styles.navIcon} /> <span>Trend Analysis</span>
            </Link>
            <Link href="/map" className={styles.navItem}>
              <FaChartBar className={styles.navIcon} /> <span>Geographic Distribution</span>
            </Link>
            <Link href="/identification" className={styles.navItem}>
              <FaChartBar className={styles.navIcon} /> <span>Identification Analysis</span>
            </Link>
          </div>
        </div>
        <Link href="/warning" className={styles.navItem}>
          <FaBell className={styles.navIcon} /> <span>Warning Management</span>
        </Link>
        <div className={`${styles.navGroup} ${isSystemOpen ? styles.open : ''}`}>
          <div className={styles.navGroupTitle} onClick={toggleSystem}>
            <FaCog className={styles.navIcon} /> <span>System Management</span>
            <FaChevronDown className={styles.navIcon} />
          </div>
          <div className={styles.navGroupItems} style={{ display: isSystemOpen ? 'block' : 'none' }}>
            <Link href="/system/users" className={styles.navItem}>
              <FaUsers className={styles.navIcon} /> <span>User Management</span>
            </Link>
            <Link href="/system/data" className={styles.navItem}>
              <FaDatabase className={styles.navIcon} /> <span>Data Configuration</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}