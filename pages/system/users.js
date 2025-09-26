import React, { useState } from 'react';
import dashboardStyles from '../../styles/Dashboard.module.css';
import styles from '../../styles/System.module.css';
import Header from '../../components/Header';
import { FaUserPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin', role: 'Administrator', email: 'admin@example.com', status: 'Active' },
    { id: 2, name: 'Doctor', role: 'Medical Staff', email: 'doctor@example.com', status: 'Active' },
    { id: 3, name: 'Researcher', role: 'Researcher', email: 'researcher@example.com', status: 'Inactive' },
  ]);

  return (
    <div className={dashboardStyles.dashboard}>
      <main className={dashboardStyles.content}>
        <Header />
        
        <div className={styles.pageHeader}>
          <h1>User Management</h1>
          <button className={styles.addButton}>
            <FaUserPlus /> Add User
          </button>
        </div>

        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input type="text" placeholder="Search users..." />
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`${styles.status} ${styles[user.status.toLowerCase()]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.editButton}>
                        <FaEdit />
                      </button>
                      <button className={styles.deleteButton}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
} 