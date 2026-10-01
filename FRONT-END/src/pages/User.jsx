import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function User() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/users'
        );
        setUsers(response.data);
      } catch (err) {
        setError('Failed to load registered users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.avatar}>👤</div>

        <h2 style={styles.title}>User Dashboard</h2>
        <p style={styles.subtitle}>
          Welcome back to your private account area.
        </p>

        <div style={styles.infoBox}>
          <p>
            <strong>Status:</strong>{' '}
            <span style={styles.badge}>Authenticated</span>
          </p>
          <p>
            <strong>Access Level:</strong> Standard User
          </p>
        </div>

        <h3 style={styles.sectionTitle}>
          Registered Users ({users.length})
        </h3>

        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p style={styles.error}>{error}</p>
        ) : users.length === 0 ? (
          <p>No registered users found.</p>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td style={styles.td}>{user.id}</td>
                    <td style={styles.td}>{user.name}</td>
                    <td style={styles.td}>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={handleLogout}
          style={styles.button}
        >
          Log Out Securely
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '850px',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  avatar: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.75rem',
    color: '#333',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#666',
    marginBottom: '2rem',
  },
  infoBox: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '6px',
    textAlign: 'left',
    marginBottom: '2rem',
    border: '1px solid #e9ecef',
  },
  badge: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  sectionTitle: {
    textAlign: 'left',
    marginBottom: '1rem',
    color: '#333',
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
    marginBottom: '2rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px',
    border: '1px solid #ddd',
  },
  td: {
    padding: '12px',
    border: '1px solid #ddd',
    color: '#333',
  },
  error: {
    color: '#dc3545',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#dc3545',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default User;