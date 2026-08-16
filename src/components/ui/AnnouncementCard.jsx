import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import styles from './AnnouncementCard.module.css';
import { getCategoryStyle, formatDate, truncateText } from '../../utils/helpers';

const AnnouncementCard = ({ title, content, date, category, pinned, image, onClick }) => {
  const categoryStyle = getCategoryStyle ? getCategoryStyle(category) : { backgroundColor: 'var(--color-primary)', color: 'white' };
  
  return (
    <div className={`${styles.card} ${pinned ? styles.pinnedCard : ''}`} onClick={onClick}>
      <div className={styles.accentBorder} style={{ backgroundColor: categoryStyle.backgroundColor }}></div>
      
      {image && (
        <div className={styles.imageContainer}>
          <img src={image} alt={title} className={styles.image} />
        </div>
      )}
      
      <div className={styles.content}>
        <div className={styles.metaInfo}>
          <span className={styles.category} style={categoryStyle}>{category}</span>
          {pinned && (
            <span className={styles.pinnedBadge}>
              <FiMapPin /> Pinned
            </span>
          )}
        </div>
        
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.date}>{formatDate ? formatDate(date) : date}</p>
        
        <p className={styles.preview}>{truncateText ? truncateText(content, 120) : content.substring(0, 120) + '...'}</p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
