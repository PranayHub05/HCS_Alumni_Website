import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronDown, FiUsers, FiAward, FiCalendar, FiHeart } from 'react-icons/fi';

import { useData } from '../../context/DataContext';
import TypewriterEffect from '../../components/ui/TypewriterEffect';
import ProfileCard from '../../components/ui/ProfileCard';
import AnnouncementCard from '../../components/ui/AnnouncementCard';
import SectionTitle from '../../components/ui/SectionTitle';
import Button from '../../components/ui/Button';
import ScrollReveal from '../../components/ui/ScrollReveal';
import useScrollReveal from '../../hooks/useScrollReveal';

import logoColor from '../../assets/logo-color.jpg';
import styles from './HomePage.module.css';

const StatCounter = ({ target, label, icon: Icon }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollReveal();
  
  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / target));
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === target) {
          clearInterval(timer);
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, target]);

  return (
    <div ref={ref} className={styles.statItem}>
      <Icon className={styles.statIcon} />
      <div className={styles.statNumber}>{count}{target > 20 ? '+' : ''}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { quotes, leadership, alumni, announcements } = useData();
  
  const scrollToLeadership = () => {
    const element = document.getElementById('leadership');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formattedQuotes = quotes?.length > 0 
    ? quotes.map(q => `"${q.text}" — ${q.author}`) 
    : ['"From darkness, lead me to light" — HCS Motto'];

  const sortedLeadership = [...(leadership || [])].sort((a, b) => (a.order || 99) - (b.order || 99));
  const recentAnnouncements = [...(announcements || [])]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const alumniCount = alumni?.length || 500;

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <video 
          className={styles.videoBg} 
          src="/videos/HCS_Video_BG.mp4"
          autoPlay 
          loop 
          muted 
          playsInline 
        >
          <source src="/videos/HCS_Video_BG.mp4" type="video/mp4" />
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className={styles.overlay}></div>
        
        <div className={styles.heroContent}>
          <motion.img 
            src={logoColor} 
            alt="HCS Logo" 
            className={styles.logo}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />
          
          <motion.h1 
            className={styles.mainTitle}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Hooghly Collegiate School Alumni Association
          </motion.h1>
          
          <div className={styles.typewriterContainer}>
            <TypewriterEffect 
              texts={formattedQuotes} 
              speed={90} 
              deleteSpeed={50} 
              pauseTime={4000} 
            />
          </div>
          
          <motion.div 
            className={styles.heroButtons}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button variant="primary" size="lg" onClick={() => navigate('/membership')}>
              Join Us
            </Button>
            <Button variant="secondary" size="lg" onClick={scrollToLeadership}>
              Association Leadership
            </Button>
          </motion.div>
        </div>
        
        <div className={styles.scrollIndicator} onClick={scrollToLeadership}>
          <FiChevronDown />
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className={styles.section}>
        <SectionTitle 
          title="Association Leadership" 
          subtitle="Meet the dedicated team guiding our alumni community" 
          centered 
        />
        
        <div className={styles.leadershipGrid}>
          {sortedLeadership.map((member, index) => (
            <ScrollReveal key={member.id || index} direction="up" delay={index * 0.1}>
              <ProfileCard 
                name={member.name}
                photo={member.photoUrl}
                designation={member.role}
                bio={member.bio}
                details={[
                  { label: 'Batch', value: member.batch },
                  { label: 'Email', value: member.email }
                ]}
                variant="leadership"
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <StatCounter target={alumniCount} label="Alumni Members" icon={FiUsers} />
          <StatCounter target={50} label="Years of Legacy" icon={FiAward} />
          <StatCounter target={100} label="Events Hosted" icon={FiCalendar} />
          <StatCounter target={25} label="Scholarships Awarded" icon={FiHeart} />
        </div>
      </section>

      {/* Announcements Section */}
      <section className={styles.announcementsSection}>
        <SectionTitle 
          title="Latest Announcements" 
          subtitle="Stay updated with our community" 
          centered 
        />
        
        <div className={styles.announcementsGrid}>
          {recentAnnouncements.map((announcement, index) => (
            <ScrollReveal key={announcement.id || index} direction="up" delay={index * 0.1}>
              <AnnouncementCard 
                title={announcement.title}
                content={announcement.content}
                date={announcement.date}
                category={announcement.category}
                pinned={announcement.pinned}
                image={announcement.imageUrl}
              />
            </ScrollReveal>
          ))}
        </div>
        
        <div className={styles.viewAllBtn}>
          <Button variant="secondary" onClick={() => navigate('/announcements')}>
            View All Announcements
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <ScrollReveal direction="up">
            <h2 className={styles.ctaTitle}>Become a Part of Our Legacy</h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <p className={styles.ctaSubtitle}>
              Join the Hooghly Collegiate School Alumni Association and stay connected with your batchmates, mentors, and the institution that shaped you.
            </p>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.4}>
            <Button variant="primary" size="lg" onClick={() => navigate('/membership')}>
              Apply for Membership
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
