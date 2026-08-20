import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import logo from '../../assets/logo-color.jpg';
import styles from './AdminLogin.module.css';
import shared from './AdminShared.module.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAdmin, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <img src={logo} alt="HCS Logo" className={styles.logo} />
        <h1 className={styles.title}>Admin Login</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Email / Username</label>
            <input 
              type="text" 
              className={shared.formInput} 
              placeholder="e.g. admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Password</label>
            <input 
              type="password" 
              className={shared.formInput} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            disabled={isSubmitting}
            className={styles.submitBtn}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
}
