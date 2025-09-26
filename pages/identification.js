import React, { useState } from 'react';
import Header from '../components/Header';
import dashboardStyles from '../styles/Dashboard.module.css';
import styles from '../styles/Identification.module.css'; // 对应的 CSS 模块

export default function IdentificationAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
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
      setDetectionResult(result.result); // 假设 API 返回的 JSON 中有一个 result 字段包含结果

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
            <h3>Analysis Results:</h3>
            {/* 这里根据你的 AI 模型返回的结果结构来显示 */}
            <pre>{JSON.stringify(detectionResult, null, 2)}</pre>
          </div>
        )}

      </main>
    </div>
  );
} 