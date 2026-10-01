import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);

      // Using Axios POST directly to your single-file backend path
      await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      navigate('/login'); 
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Sign up to get started</p>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} style={styles.input} required />
          </div>

          <button type="submit" disabled={loading} style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
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
  button: { padding: '0.75rem', borderRadius: '4px', border: 'none', backgroundColor: '#28a745', color: '#fff', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '0.5rem' },
  buttonDisabled: { backgroundColor: '#cccccc', cursor: 'not-allowed' },
  footerText: { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#555' },
  link: { color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }
};

export default Register;