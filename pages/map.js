import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from '../styles/Map.module.css';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { useRouter } from 'next/router';

// Set your Mapbox access token from environment variable
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [monitoringPoints, setMonitoringPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // 获取监测点数据
    const fetchPoints = async () => {
      try {
        const res = await fetch('/api/geoPoints');
        if (!res.ok) throw new Error('Failed to fetch geo points');
        const data = await res.json();
        setMonitoringPoints(data);
      } catch (err) {
        setError('无法获取监测点数据');
      }
    };
    fetchPoints();
  }, [router.asPath]);

  useEffect(() => {
    // 只有数据加载后再初始化地图
    if (!monitoringPoints.length) return;
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-98.5795, 45],
        zoom: 4,
        pitch: 0,
        bearing: 0,
        projection: 'globe' // 使用地球投影
      });
      // 添加导航控件
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.on('load', () => {
        monitoringPoints.forEach(point => {
          const el = document.createElement('div');
          el.className = styles.marker;
          el.style.width = '30px';
          el.style.height = '30px';
          el.style.backgroundColor = point.amrLevel === 'High' ? '#ff4444' : 
                                   point.amrLevel === 'Medium' ? '#ffbb33' : '#00C851';
          el.style.borderRadius = '50%';
          el.style.border = '2px solid white';
          el.style.cursor = 'pointer';

          new mapboxgl.Marker(el)
            .setLngLat(point.coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <h3>${point.name}</h3>
                  <p>AMR Level: ${point.amrLevel}</p>
                  <p>Last Update: ${point.lastUpdate}</p>
                `)
            )
            .addTo(map.current);

          el.addEventListener('click', () => {
            setSelectedPoint(point);
          });
        });
      });
      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setError('Failed to load map. Please check your network connection or refresh the page.');
      });
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to initialize map. Please check your network connection or refresh the page.');
    }
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [monitoringPoints, router.asPath]);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapContainer} className={styles.map} />
      <Link href="/" className={styles.homeButton}>
        <FaHome className={styles.homeIcon} />
        <span>Back to Dashboard</span>
      </Link>
      {error && (
        <div className={styles.error}>{error}</div>
      )}
      {selectedPoint && (
        <div className={styles.infoPanel}>
          <h2 className={styles.panelTitle}>{selectedPoint.name}</h2>
          <div className={styles.panelContent}>
            <p><span className={styles.label}>AMR Level:</span> {selectedPoint.amrLevel}</p>
            <p><span className={styles.label}>Last Update:</span> {selectedPoint.lastUpdate}</p>
            <p><span className={styles.label}>Resistant Types:</span> {selectedPoint.details.resistance.join(', ')}</p>
            <p><span className={styles.label}>Sample Count:</span> {selectedPoint.details.samples}</p>
            <p><span className={styles.label}>Positive Rate:</span> {selectedPoint.details.positiveRate}</p>
          </div>
          <button 
            className={styles.closeButton}
            onClick={() => setSelectedPoint(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
