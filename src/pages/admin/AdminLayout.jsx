import React, { useState } from 'react';
import { Navigate, Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import logo from '../../assets/logo-color.jpg';
import styles from './AdminLayout.module.css';
import { 
  FiHome, FiUsers, FiUserCheck, FiBook, FiBell, FiCheckSquare, 
  FiMessageSquare, FiMail, FiBookOpen, FiUserPlus, FiSettings,
  FiExternalLink, FiLogOut, FiMenu, FiX
} from 'react-icons/fi';

export default function AdminLayout() {
  const { isAdmin, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <LoadingSpinner size="lg" />;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  const navItems = [
    { to: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
    { to: '/admin/leadership', icon: FiUsers, label: 'Leadership' },
    { to: '/admin/alumni', icon: FiUserCheck, label: 'Alumni' },
    { to: '/admin/teachers', icon: FiBook, label: 'Ex Teachers' },
    { to: '/admin/announcements', icon: FiBell, label: 'Announcements' },
    { to: '/admin/tasks', icon: FiCheckSquare, label: 'Tasks' },
    { to: '/admin/quotes', icon: FiMessageSquare, label: 'Quotes' },
    { to: '/admin/contact', icon: FiMail, label: 'Contact Info' },
    { to: '/admin/history', icon: FiBookOpen, label: 'School History' },
    { to: '/admin/members', icon: FiUserPlus, label: 'Membership Requests' },
    { to: '/admin/homepage', icon: FiSettings, label: 'Homepage Settings' }
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={styles.layout}>
      <button 
        className={styles.mobileToggle} 
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.brand}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h2>Admin Panel</h2>
        </div>
        
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink 
              key={item.to} 
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.activeLink : ''}`
              }
            >
              <item.icon className={styles.navIcon} />
              {item.label}
            </NavLink>
          ))}
          
          <div className={styles.divider}></div>
          
          <NavLink to="/" className={styles.navLink} target="_blank">
            <FiExternalLink className={styles.navIcon} />
            Back to Site
          </NavLink>
          
          <button onClick={handleLogout} className={`${styles.navLink} ${styles.logoutBtn}`}>
            <FiLogOut className={styles.navIcon} />
            Logout
          </button>
        </nav>
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
