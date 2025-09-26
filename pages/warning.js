import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import dashboardStyles from '../styles/Dashboard.module.css';
import styles from '../styles/Warning.module.css';
import { FaFilter, FaSearch, FaBell } from 'react-icons/fa';
import axios from 'axios';

function formatTime(time) {
  try {
    return new Date(time).toLocaleString();
  } catch {
    return '';
  }
}

export default function WarningManagement() {
  const [warnings, setWarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    fetchWarnings();
    setIsClient(true);
  }, []);

  const fetchWarnings = async () => {
    try {
      const response = await axios.get('/api/warnings');
      setWarnings(response.data);
    } catch (error) {
      console.error('Failed to fetch warnings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWarnings = warnings.filter(warning => {
    const matchesSearch = warning.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         warning.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === '' || warning.level === filter;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put('/api/warnings', {
        id,
        status: newStatus
      });
      fetchWarnings(); // 刷新数据
    } catch (error) {
      console.error('Failed to update warning status:', error);
    }
  };

  return (
    <div className={dashboardStyles.dashboard}>
      <main className={dashboardStyles.content}>
        <Header />
        
        <div className={styles.pageHeader}>
          <h1><FaBell className={styles.headerIcon} /> Warning Management</h1>
        </div>

        <div className={styles.controls}>
          <div className={styles.filterGroup}>
            <FaFilter className={styles.controlIcon} />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={styles.select}
            >
              <option value="">All Levels</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className={styles.searchGroup}>
            <FaSearch className={styles.controlIcon} />
            <input 
              type="text"
              placeholder="Search warnings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.tableContainer}>
          {loading || !isClient ? (
            <div className={styles.loading}>Loading warnings...</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Level</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWarnings.length > 0 ? (
                  filteredWarnings.map(warning => (
                    <tr key={warning._id}>
                      <td>{warning.type}</td>
                      <td><span className={`${styles.level} ${styles[warning.level.toLowerCase()]}`}>{warning.level}</span></td>
                      <td>{formatTime(warning.time)}</td>
                      <td>{warning.location}</td>
                      <td>
                        <select
                          value={warning.status}
                          onChange={(e) => handleStatusChange(warning._id, e.target.value)}
                          className={`${styles.statusSelect} ${styles[warning.status.toLowerCase()]}`}
                        >
                          <option value="New">New</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>
                      <td>
                        <button className={styles.actionBtn}>View Details</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className={styles.noData}>
                      No warnings found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
