import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiMenu, FiX, FiLock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Header.module.css';
import logo from '../../assets/logo-color.jpg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/members', label: 'Members' },
    { path: '/announcements', label: 'Announcements' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/contact', label: 'Contact' },
    { path: '/membership', label: 'Membership' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoContainer} onClick={closeMenu}>
          <img src={logo} alt="HCS Logo" className={styles.logo} />
          <span className={styles.brandName}>HCS Alumni</span>
        </Link>

        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/admin/login" className={styles.adminLink} title="Admin Login">
            <FiLock />
          </Link>
        </nav>

        <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle Menu">
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className={styles.mobileNav}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) => isActive ? `${styles.mobileNavLink} ${styles.active}` : styles.mobileNavLink}
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to="/admin/login" className={styles.mobileAdminLink} onClick={closeMenu}>
                <FiLock /> Admin Login
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
