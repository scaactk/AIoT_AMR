import React, { useState } from 'react';
import Header from '../components/Header';
import dashboardStyles from '../styles/Dashboard.module.css';
import styles from '../styles/Identification.module.css'; // 对应的 CSS 模块

export default function IdentificationAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null); // full API response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    console.log('File selected:', file); // 添加日志
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDetectionResult(null); // Clear previous results
      setError(null); // Clear previous errors
      console.log('selectedFile state updated:', file); // 添加日志
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image file first.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      // 调用后端识别 API
      const response = await fetch('/api/identify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Image identification failed.');
      }

  const result = await response.json();
  setDetectionResult(result); // 现在直接保存完整结构 { campy:[], salmonella:[], summary, metadata }

    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={dashboardStyles.dashboard}>
      <main className={dashboardStyles.content}>
        <Header />

        <div className={styles.pageHeader}>
          <h1>Identification Analysis</h1>
        </div>

        <div className={styles.uploadSection}>
          <h2>Upload Image for Analysis</h2>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleUpload} disabled={!selectedFile || loading}>
            {loading ? 'Analyzing...' : 'Upload and Analyze'}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </div>

        {previewUrl && (
          <div className={styles.preview}>
            <h3>Image Preview:</h3>
            <img src={previewUrl} alt="Image Preview" className={styles.imagePreview} />
          </div>
        )}

        {detectionResult && (
          <div className={styles.results}>
            <h3>Analysis Results</h3>
            <div className={styles.wellColumnsWrapper}>
              <WellColumn title="Campylobacter (7 wells incl. NC)" data={detectionResult.campy} />
              <WellColumn title="Salmonella (7 wells incl. NC)" data={detectionResult.salmonella} />
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// Presentational components
function WellColumn({ title, data = [] }) {
  return (
    <div className={styles.wellColumn}>
      <h4 className={styles.columnTitle}>{title}</h4>
      <ul className={styles.wellList}>
        {data.map((val, idx) => (
          <li key={idx} className={styles.wellItem}>
            <span className={styles.wellIndex}>{idx === 0 ? 'NC' : idx}</span>
            <StatusBadge value={val} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusBadge({ value }) {
  const positive = value === 'positive';
  return (
    <span className={`${styles.statusBadge} ${positive ? styles.positive : styles.negative}`}> 
      {positive ? 'Positive' : 'Negative'}
    </span>
  );
}

// SummaryCard removed per latest requirement (summary section omitted)
// SummaryCard removed per latest requirement (summary section omitted)