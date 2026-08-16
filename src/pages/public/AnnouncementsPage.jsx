import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import AnnouncementCard from '../../components/ui/AnnouncementCard';
import SectionTitle from '../../components/ui/SectionTitle';
import Modal from '../../components/ui/Modal';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { formatDate, getCategoryStyle } from '../../utils/helpers';
import styles from './AnnouncementsPage.module.css';

const AnnouncementsPage = () => {
  const { announcements, loading } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const categories = ['All', 'Notice', 'Event', 'Meeting', 'Urgent'];

  const filteredAnnouncements = useMemo(() => {
    if (!announcements) return [];
    
    // Sort by date descending
    const sorted = [...announcements].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (activeCategory === 'All') return sorted;
    return sorted.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase());
  }, [announcements, activeCategory]);

  const pinnedAnnouncements = useMemo(() => {
    return filteredAnnouncements.filter(a => a.pinned);
  }, [filteredAnnouncements]);

  const regularAnnouncements = useMemo(() => {
    return filteredAnnouncements.filter(a => !a.pinned);
  }, [filteredAnnouncements]);

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
            title="Announcements & Notices" 
            subtitle="Stay updated with the latest from the alumni association"
            light
            centered
          />
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className="container">
          <div className={styles.filterSection}>
            <div className={styles.tabsContainer}>
              {categories.map(category => (
                <button
                  key={category}
                  className={`${styles.tabBtn} ${activeCategory === category ? styles.activeTab : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredAnnouncements.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No announcements in this category</p>
            </div>
          ) : (
            <div className={styles.announcementsContainer}>
              {pinnedAnnouncements.length > 0 && (
                <div className={styles.pinnedSection}>
                  <h3 className={styles.sectionHeader}>
                    <span className={styles.pinIcon}>📌</span> Pinned
                  </h3>
                  <div className={styles.list}>
                    {pinnedAnnouncements.map((announcement, index) => (
                      <ScrollReveal key={announcement.id} delay={index * 0.1}>
                        <div onClick={() => setSelectedAnnouncement(announcement)} className={styles.cardWrapper}>
                          <AnnouncementCard {...announcement} />
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}

              {regularAnnouncements.length > 0 && (
                <div className={styles.regularSection}>
                  {pinnedAnnouncements.length > 0 && (
                    <h3 className={styles.sectionHeader}>Latest Updates</h3>
                  )}
                  <div className={styles.list}>
                    <AnimatePresence>
                      {regularAnnouncements.map((announcement, index) => (
                        <motion.div
                          key={announcement.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          onClick={() => setSelectedAnnouncement(announcement)}
                          className={styles.cardWrapper}
                        >
                          <AnnouncementCard {...announcement} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Modal 
        isOpen={!!selectedAnnouncement} 
        onClose={() => setSelectedAnnouncement(null)}
        title="Announcement Details"
        size="lg"
      >
        {selectedAnnouncement && (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <span className={`${styles.categoryBadge} ${styles[getCategoryStyle(selectedAnnouncement.category)] || ''}`}>
                {selectedAnnouncement.category}
              </span>
              <span className={styles.modalDate}>{formatDate(selectedAnnouncement.date)}</span>
            </div>
            
            <h2 className={styles.modalTitle}>{selectedAnnouncement.title}</h2>
            
            {selectedAnnouncement.image && (
              <div className={styles.modalImageContainer}>
                <img src={selectedAnnouncement.image} alt={selectedAnnouncement.title} className={styles.modalImage} />
              </div>
            )}
            
            <div className={styles.modalText}>
              {selectedAnnouncement.content.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AnnouncementsPage;
