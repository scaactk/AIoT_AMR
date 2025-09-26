import React from 'react';
import styles from '../styles/ResistanceGauge.module.css';

export default function ResistanceGauge({ value = 76.2 }) {
  // value: 0-100
  const radius = 90;
  const centerX = 100;
  const centerY = 120; // 圆心在底边

  // 极坐标到直角坐标转换，适用于上半圆 (0°在右，逆时针到180°)
  function polarToCartesian(cx, cy, r, angleInDegrees) {
    const angleInRadians = angleInDegrees * Math.PI / 180.0;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy - r * Math.sin(angleInRadians) // 注意这里是减，因为上半圆y坐标减小
    };
  }

  // 半圆路径：起点180°（左上），终点0°（右上）
  const start = polarToCartesian(centerX, centerY, radius, 180);
  const end = polarToCartesian(centerX, centerY, radius, 0);

  // 指针角度：0%在180°（左），100%在0°（右）
  const pointerAngle = 180 - (value / 100) * 180;
  // 修正指针长度，让尖端指向圆弧中心
  const pointer = polarToCartesian(centerX, centerY, radius, pointerAngle);

  return (
    <div className={styles.gaugeCard}>
      <svg width="320" height="210" viewBox="0 0 320 210" className={styles.gaugeSvg}>
        {/* 渐变色环 */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
        </defs>
        <path
          d={`M ${start.x * 1.6} ${start.y * 1.615} A ${radius * 1.6} ${radius * 1.615} 0 0 1 ${end.x * 1.6} ${end.y * 1.615}`}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="28"
          strokeLinecap="round"
        />
        {/* 指针 */}
        <line
          x1={centerX * 1.6}
          y1={centerY * 1.615}
          x2={pointer.x * 1.6}
          y2={pointer.y * 1.615}
          stroke="#fff"
          strokeWidth="6"
          strokeLinecap="round"
          className={styles.gaugeNeedle}
        />
        {/* 指针轴点 */}
        <circle cx={centerX * 1.6} cy={centerY * 1.615} r="10" fill="#fff" />
      </svg>
      <div className={styles.gaugeValueBox}>
        <div className={styles.gaugeValue}>{value.toFixed(1)}%</div>
        <div className={styles.gaugeLabel}>Resistant Sample Ratio</div>
      </div>
    </div>
  );
} 