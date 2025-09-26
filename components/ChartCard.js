import React, { useRef } from 'react';
import styles from '../styles/ChartCard.module.css';
import html2canvas from 'html2canvas';

export default function ChartCard({ title, type, chart, legend, fullWidth = false }) {
  const cardRef = useRef(null);

  const handleExport = async () => {
    if (!cardRef.current) return;
    // 记录原始样式
    const originalBg = cardRef.current.style.backgroundColor;
    const originalBgImg = cardRef.current.style.backgroundImage;
    // 移除背景色和背景图
    cardRef.current.style.backgroundColor = 'transparent';
    cardRef.current.style.backgroundImage = 'none';

    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      useCORS: true
    });

    // 恢复原始样式
    cardRef.current.style.backgroundColor = originalBg;
    cardRef.current.style.backgroundImage = originalBgImg;

    const link = document.createElement('a');
    link.download = `${title || 'chart'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div ref={cardRef} className={`${styles.card} ${fullWidth ? styles.fullWidth : ''}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.actions}>
          <button className={styles.actionBtn}>Refresh</button>
          <button className={styles.actionBtn} onClick={handleExport}>More</button>
        </div>
      </div>
      <div className={styles.chartContainer}>
        {chart}
      </div>
      {legend && <div className={styles.legend}>{legend}</div>}
    </div>
  );
}
