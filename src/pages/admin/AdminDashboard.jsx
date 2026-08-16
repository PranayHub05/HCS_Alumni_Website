import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Button from '../../components/ui/Button';
import styles from './AdminDashboard.module.css';
import shared from './AdminShared.module.css';
import { FiUsers, FiUserPlus, FiCheckSquare, FiBell } from 'react-icons/fi';
import { formatDateShort } from '../../utils/helpers';

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const { alumni, membershipRequests, tasks, announcements } = useData();
  const navigate = useNavigate();

  const totalMembers = alumni?.length || 0;
  const pendingRequests = membershipRequests?.filter(r => r.status === 'pending').length || 0;
  const activeTasks = tasks?.filter(t => t.status === 'in-progress').length || 0;
  const totalAnnouncements = announcements?.length || 0;

  return (
    <div className={shared.adminPage}>
      <div className={shared.pageHeader}>
        <h1>Welcome, {currentUser?.displayName || 'Admin'}</h1>
      </div>

      <div className={styles.grid}>
        <div className={`${styles.statCard} ${styles.maroon}`}>
          <FiUsers className={styles.statIcon} />
          <div className={styles.statInfo}>
            <h3>Total Members</h3>
            <p>{totalMembers}</p>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.amber}`}>
          <FiUserPlus className={styles.statIcon} />
          <div className={styles.statInfo}>
            <h3>Pending Requests</h3>
            <p>{pendingRequests}</p>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.blue}`}>
          <FiCheckSquare className={styles.statIcon} />
          <div className={styles.statInfo}>
            <h3>Active Tasks</h3>
            <p>{activeTasks}</p>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.green}`}>
          <FiBell className={styles.statIcon} />
          <div className={styles.statInfo}>
            <h3>Announcements</h3>
            <p>{totalAnnouncements}</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Quick Actions</h2>
        <div className={styles.quickActions}>
          <Button onClick={() => navigate('/admin/announcements')}>Add Announcement</Button>
          <Button onClick={() => navigate('/admin/members')} variant="secondary">Review Memberships</Button>
          <Button onClick={() => navigate('/admin/tasks')} variant="ghost">Manage Tasks</Button>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Recent Announcements</h2>
        <div className={styles.activityList}>
          {announcements?.slice(0, 3).map(ann => (
            <div key={ann.id} className={styles.activityItem}>
              <strong>{ann.title}</strong> - {formatDateShort(ann.date)}
            </div>
          ))}
          {(!announcements || announcements.length === 0) && (
            <p className={shared.emptyState}>No recent announcements.</p>
          )}
        </div>
      </div>
    </div>
  );
}
