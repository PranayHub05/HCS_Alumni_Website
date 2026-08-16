import React from 'react';
import { motion } from 'framer-motion';

import { useData } from '../../context/DataContext';
import SectionTitle from '../../components/ui/SectionTitle';
import ScrollReveal from '../../components/ui/ScrollReveal';

import styles from './AboutPage.module.css';

const LampIcon = () => (
  <svg 
    className={styles.lampIcon} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    height="1em" 
    width="1em"
  >
    <path d="M12 2C8.69 2 6 4.69 6 8c0 2.27 1.27 4.25 3.16 5.25.1.06.18.15.22.25l.84 2.52c.2.6.76 1 1.4 1h2.76c.64 0 1.2-.4 1.4-1l.84-2.52c.04-.1.12-.19.22-.25C18.73 12.25 20 10.27 20 8c0-3.31-2.69-6-6-6zm0 2c2.21 0 4 1.79 4 4 0 1.5-1 2.82-2.38 3.52-.39.2-.72.54-.93.94l-.77 2.31c-.08.24-.31.39-.57.39h-2.7c-.26 0-.49-.15-.57-.39l-.77-2.31c-.21-.4-.54-.74-.93-.94C8 10.82 7 9.5 7 8c0-2.21 1.79-4 4-4zm-4 15h8v2H8v-2z" />
  </svg>
);

const AboutPage = () => {
  const { schoolHistory } = useData();

  // Fallback data if context is empty
  const intro = schoolHistory?.intro || "Hooghly Collegiate School is one of the oldest and most prestigious educational institutions in West Bengal, India. Established in 1812, it has a rich heritage of academic excellence and cultural contribution.";
  
  const sections = schoolHistory?.sections || [
    {
      id: 1,
      year: "1812",
      title: "The Foundation",
      content: "The school was established with a vision to provide quality education and foster a spirit of enlightenment among the youth. It began its journey as a modest institution but quickly gained a reputation for excellence.",
      imageUrl: ""
    },
    {
      id: 2,
      year: "1836",
      title: "Growth and Expansion",
      content: "With growing numbers and an expanding curriculum, the school relocated to a larger campus. This period saw the introduction of new subjects and the establishment of a robust academic framework that stood the test of time.",
      imageUrl: ""
    },
    {
      id: 3,
      year: "1900s",
      title: "A Hub of Cultural Awakening",
      content: "During the early 20th century, the school became a center for cultural and intellectual awakening. Many notable alumni who later played significant roles in the Indian independence movement and various fields of arts and sciences were nurtured here.",
      imageUrl: ""
    }
  ];

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <SectionTitle 
          title="Our Heritage & Legacy" 
          subtitle="The story of Hooghly Collegiate School" 
          light 
          centered 
        />
      </section>

      {/* Introduction */}
      <section className={styles.introSection}>
        <div className={styles.introContent}>
          <ScrollReveal direction="up">
            <p className={styles.introText}>{intro}</p>
            <div className={styles.divider}></div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline Sections */}
      <section className={styles.timelineSection}>
        {sections.map((section, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <div 
              key={section.id || index} 
              className={`${styles.historyItem} ${isReversed ? styles.reversed : ''}`}
            >
              <div className={styles.historyContent}>
                <ScrollReveal direction={isReversed ? 'left' : 'right'}>
                  <div className={styles.historyYear}>{section.year}</div>
                  <h3 className={styles.historyTitle}>{section.title}</h3>
                  <p className={styles.historyText}>{section.content}</p>
                </ScrollReveal>
              </div>
              <div className={styles.historyImageWrapper}>
                <ScrollReveal direction={isReversed ? 'right' : 'left'}>
                  {section.imageUrl ? (
                    <img 
                      src={section.imageUrl} 
                      alt={section.title} 
                      className={styles.historyImage} 
                    />
                  ) : (
                    <div className={styles.historyImage}></div>
                  )}
                </ScrollReveal>
              </div>
            </div>
          );
        })}
      </section>

      {/* Legacy Quote */}
      <section className={styles.legacySection}>
        <div className={styles.legacyContent}>
          <ScrollReveal direction="up">
            <h2 className={styles.legacyQuote}>তমসো মা জ্যোতির্গময়</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className={styles.legacyTranslation}>From darkness, lead me to light</p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.4}>
            <LampIcon />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
