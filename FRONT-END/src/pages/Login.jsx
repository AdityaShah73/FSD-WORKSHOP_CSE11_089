import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);

      // Axios automatically handles stringifying the JSON payload body
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      // Axios places the backend response data object directly in response.data
      localStorage.setItem('userToken', response.data.token);
      
      navigate('/'); 
    } catch (err) {
      // Axios stores server error responses inside err.response.data
      const errorMsg = err.response?.data?.message || 'Invalid email or password.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account?{' '}
          <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f6f8', fontFamily: 'Arial, sans-serif' },
  card: { width: '100%', maxWidth: '400px', padding: '2.5rem', borderRadius: '8px', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' },
  title: { margin: '0 0 0.5rem 0', fontSize: '1.75rem', color: '#333', textAlign: 'center' },
  subtitle: { margin: '0 0 2rem 0', color: '#666', textAlign: 'center', fontSize: '0.9rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { fontSize: '0.85rem', fontWeight: 'bold', color: '#444' },
  input: { padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem', outline: 'none' },
  errorAlert: { backgroundColor: '#ffebee', color: '#c62828', padding: '0.75rem', borderRadius: '4px', fontSize: '0.85rem', marginBottom: '1rem', border: '1px solid #ffcdd2' },
  button: { padding: '0.75rem', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' },
  buttonDisabled: { backgroundColor: '#cccccc', cursor: 'not-allowed' },
  footerText: { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#555' },
  link: { color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }
};

export default Login;