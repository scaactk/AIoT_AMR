import React from 'react';
import styles from '../styles/StatCard.module.css';

export default function StatCard({ title, value, change, isPositive, color, background }) {
  return (
    <div className={styles.card} style={background ? { background } : {}}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.value}>{value}</p>
      </div>
      <div className={`${styles.icon} ${styles[color]}`}></div>
      <div className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}>
        {change}
      </div>
    </div>
  );
}
