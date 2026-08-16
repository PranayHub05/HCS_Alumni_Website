import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { useData } from '../../context/DataContext';
import styles from './Footer.module.css';
import logo from '../../assets/logo-color.jpg';

const Footer = () => {
  // Using optional chaining or empty fallback if context isn't fully ready
  const data = useData() || {};
  const contactInfo = data.contactInfo || {};
  const socialLinks = data.socialLinks || {};
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.divider}></div>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1: Brand */}
          <div className={styles.col}>
            <div className={styles.brand}>
              <img src={logo} alt="HCS Logo" className={styles.logo} />
              <span className={styles.brandName}>HCS Alumni</span>
            </div>
            <p className={styles.aboutText}>
              Connecting generations of Hooghly Collegiate School graduates, fostering lifelong bonds, and giving back to our beloved alma mater.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <nav className={styles.links}>
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/announcements">Announcements</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/membership">Membership</Link>
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Contact Info</h3>
            <div className={styles.contactDetails}>
              <p>{contactInfo.email || 'contact@hcsalumni.org'}</p>
              <p>{contactInfo.phone || '+91 98765 43210'}</p>
              <p>{contactInfo.address || 'Hooghly Collegiate School, Chinsurah, Hooghly'}</p>
            </div>
          </div>

          {/* Column 4: Socials */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Connect With Us</h3>
            <div className={styles.socials}>
              {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noreferrer"><FaFacebook /></a>}
              {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noreferrer"><FaTwitter /></a>}
              {socialLinks.instagram && <a href={socialLinks.instagram} target="_blank" rel="noreferrer"><FaInstagram /></a>}
              {socialLinks.youtube && <a href={socialLinks.youtube} target="_blank" rel="noreferrer"><FaYoutube /></a>}
              {socialLinks.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>}
              {socialLinks.whatsapp && <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer"><FaWhatsapp /></a>}
              
              {/* Fallback if no socials in context yet */}
              {!Object.keys(socialLinks).length && (
                <>
                  <a href="#" aria-label="Facebook"><FaFacebook /></a>
                  <a href="#" aria-label="Instagram"><FaInstagram /></a>
                  <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>&copy; {currentYear} Hooghly Collegiate School Alumni Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
