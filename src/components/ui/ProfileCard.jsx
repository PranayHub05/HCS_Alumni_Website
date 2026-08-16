import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import styles from './ProfileCard.module.css';
import { getInitials } from '../../utils/helpers';

const ProfileCard = ({ name, photo, designation, details = [], bio, variant = 'default', socialLinks }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.header}>
        {photo ? (
          <img src={photo} alt={name} className={styles.photo} />
        ) : (
          <div className={styles.avatarPlaceholder}>{getInitials ? getInitials(name) : name.charAt(0)}</div>
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        {designation && <p className={styles.designation}>{designation}</p>}
        
        {variant === 'teacher' && <p className={styles.tributeText}>Respected Faculty Member</p>}

        {details.length > 0 && (
          <div className={styles.details}>
            {details.map((detail, index) => (
              <div key={index} className={styles.detailRow}>
                <span className={styles.label}>{detail.label}:</span>
                <span className={styles.value}>{detail.value}</span>
              </div>
            ))}
          </div>
        )}

        {bio && (
          <div className={styles.bioContainer}>
            <p className={`${styles.bio} ${expanded ? styles.expanded : ''}`}>
              {bio}
            </p>
            {bio.length > 100 && (
              <button className={styles.readMoreBtn} onClick={() => setExpanded(!expanded)}>
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        )}

        {socialLinks && (
          <div className={styles.socials}>
            {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noreferrer"><FaFacebook /></a>}
            {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noreferrer"><FaTwitter /></a>}
            {socialLinks.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /></a>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
