import React from 'react';
import { FiUser, FiCalendar, FiActivity } from 'react-icons/fi';
import styles from './TaskCard.module.css';
import { getStatusColor, getStatusLabel, formatDateShort } from '../../utils/helpers';

const TaskCard = ({ title, description, status, assignedTo, deadline, progress }) => {
  const statusColor = getStatusColor ? getStatusColor(status) : 'var(--color-primary)';
  const displayStatus = getStatusLabel ? getStatusLabel(status) : status;
  
  return (
    <div className={styles.card}>
      <div className={styles.topBorder} style={{ backgroundColor: statusColor }}></div>
      
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span 
          className={styles.statusBadge}
          style={{ backgroundColor: `${statusColor}15`, color: statusColor, border: `1px solid ${statusColor}` }}
        >
          {displayStatus}
        </span>
      </div>
      
      <p className={styles.description}>{description}</p>
      
      <div className={styles.progressContainer}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}><FiActivity /> Progress</span>
          <span className={styles.progressValue}>{progress}%</span>
        </div>
        <div className={styles.progressBarBg}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progress}%`, backgroundColor: statusColor }}
          ></div>
        </div>
      </div>
      
      <div className={styles.footer}>
        <div className={styles.metaItem}>
          <FiUser className={styles.icon} />
          <span>{assignedTo}</span>
        </div>
        <div className={styles.metaItem}>
          <FiCalendar className={styles.icon} />
          <span>{formatDateShort ? formatDateShort(deadline) : deadline}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
