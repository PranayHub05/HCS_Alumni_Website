import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import TaskCard from '../../components/ui/TaskCard';
import SectionTitle from '../../components/ui/SectionTitle';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { FiCheckCircle, FiClock, FiActivity, FiList } from 'react-icons/fi';
import { getStatusColor, getStatusLabel } from '../../utils/helpers';
import styles from './TasksPage.module.css';

const TasksPage = () => {
  const { tasks, loading } = useData();
  const [activeStatus, setActiveStatus] = useState('All');

  const statuses = ['All', 'Pending', 'In Progress', 'Completed'];

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    
    if (activeStatus === 'All') return tasks;
    return tasks.filter(t => t.status.toLowerCase() === activeStatus.toLowerCase().replace(' ', '-'));
  }, [tasks, activeStatus]);

  const stats = useMemo(() => {
    if (!tasks) return { total: 0, inProgress: 0, completed: 0, progress: 0 };
    
    const total = tasks.length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    
    return {
      total,
      inProgress,
      completed,
      progress: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [tasks]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <header className={styles.heroSection}>
        <div className="container">
          <SectionTitle 
            title="Active Tasks" 
            subtitle="Track the ongoing initiatives of our association"
            light
            centered
          />
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className="container">
          <div className={styles.statsGrid}>
            <ScrollReveal delay={0.1}>
              <div className={`${styles.statCard} ${styles.statTotal}`}>
                <div className={styles.statIcon}><FiList /></div>
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>{stats.total}</span>
                  <span className={styles.statLabel}>Total Tasks</span>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className={`${styles.statCard} ${styles.statInProgress}`}>
                <div className={styles.statIcon}><FiActivity /></div>
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>{stats.inProgress}</span>
                  <span className={styles.statLabel}>In Progress</span>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div className={`${styles.statCard} ${styles.statCompleted}`}>
                <div className={styles.statIcon}><FiCheckCircle /></div>
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>{stats.completed}</span>
                  <span className={styles.statLabel}>Completed</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.tabsContainer}>
              {statuses.map(status => (
                <button
                  key={status}
                  className={`${styles.tabBtn} ${activeStatus === status ? styles.activeTab : ''}`}
                  onClick={() => setActiveStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No tasks with this status</p>
            </div>
          ) : (
            <div className={styles.tasksGrid}>
              <AnimatePresence>
                {filteredTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <TaskCard {...task} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <ScrollReveal direction="up" delay={0.2}>
            <div className={styles.progressSection}>
              <h3 className={styles.progressTitle}>Overall Progress</h3>
              <div className={styles.progressContainer}>
                <div className={styles.progressText}>
                  <span>{stats.completed} of {stats.total} tasks completed</span>
                  <span className={styles.progressPercentage}>{stats.progress}%</span>
                </div>
                <div className={styles.progressBarBg}>
                  <motion.div 
                    className={styles.progressBarFill}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stats.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
    </div>
  );
};

export default TasksPage;
