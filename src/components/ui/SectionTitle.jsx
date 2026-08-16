import React from 'react';
import styles from './SectionTitle.module.css';
import ScrollReveal from './ScrollReveal';

const SectionTitle = ({ title, subtitle, light = false, centered = true }) => {
  return (
    <ScrollReveal direction="up">
      <div className={`${styles.container} ${centered ? styles.centered : ''} ${light ? styles.light : ''}`}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.underline}></div>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </ScrollReveal>
  );
};

export default SectionTitle;
