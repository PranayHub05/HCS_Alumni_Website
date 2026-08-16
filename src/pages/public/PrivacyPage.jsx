import React from 'react';
import SectionTitle from '../../components/ui/SectionTitle';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { useData } from '../../context/DataContext';
import styles from './PrivacyPage.module.css';

const PrivacyPage = () => {
  const { siteConfig } = useData();
  const lastUpdated = siteConfig?.privacyLastUpdated || 'October 1, 2023';

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <SectionTitle 
            title="Privacy Policy" 
            light={true} 
            centered={true} 
          />
        </div>
      </section>

      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <ScrollReveal direction="up" delay={0.1}>
            <div className={styles.introBlock}>
              <p>
                At the HCS Alumni Association, we take your privacy seriously. This Privacy Policy 
                outlines how we collect, use, store, and protect your personal information when you 
                visit our website or interact with our services.
              </p>
              <p className={styles.lastUpdated}>Last Updated: {lastUpdated}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <section className={styles.policySection}>
              <h3>1. Information We Collect</h3>
              <p>We may collect personal information that you voluntarily provide to us, including but not limited to:</p>
              <ul>
                <li><strong>Contact Information:</strong> Name, email address, phone number provided via our contact forms.</li>
                <li><strong>Membership Details:</strong> Batch year, profession, location, and photo when applying for membership.</li>
                <li><strong>Browsing Data:</strong> Standard analytics data such as IP address, browser type, and pages visited (if applicable).</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <section className={styles.policySection}>
              <h3>2. How We Use Your Information</h3>
              <p>The information we collect is used in the following ways:</p>
              <ul>
                <li>To process and review membership applications.</li>
                <li>To respond to inquiries and provide customer support.</li>
                <li>To send relevant communications about alumni events, news, and opportunities.</li>
                <li>To maintain an up-to-date alumni directory (with your explicit consent).</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <section className={styles.policySection}>
              <h3>3. Data Storage & Security</h3>
              <p>
                Your personal data is stored securely using Firebase infrastructure. We implement appropriate technical 
                and organizational measures to protect your data against unauthorized access, alteration, disclosure, 
                or destruction. Access to personal data is restricted strictly to authorized administrators.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <section className={styles.policySection}>
              <h3>4. Admin Login & Access</h3>
              <p>
                Administrative access to the website backend is secured and restricted. Only authenticated 
                administrators can view submitted forms and manage website content. All admin activities 
                are securely logged and monitored to ensure data integrity.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <section className={styles.policySection}>
              <h3>5. Cookies & Tracking</h3>
              <p>
                Our website uses minimal cookies essential for session management and basic functionality. 
                We do not use third-party tracking cookies for targeted advertising. You can choose to 
                disable cookies through your browser settings, though this may affect site functionality.
              </p>
            </section>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <section className={styles.policySection}>
              <h3>6. Your Rights</h3>
              <p>You have the right to:</p>
              <ul>
                <li>Request access to the personal information we hold about you.</li>
                <li>Request corrections to inaccurate or incomplete data.</li>
                <li>Request deletion of your personal data from our systems.</li>
                <li>Opt-out of non-essential communications.</li>
              </ul>
            </section>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <section className={styles.policySection}>
              <h3>7. Contact for Privacy Concerns</h3>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or your 
                personal data, please contact us at:
              </p>
              <div className={styles.contactBlock}>
                <strong>Email:</strong> privacy@hcsalumni.org<br/>
                <strong>Address:</strong> HCS Alumni Association, 123 Heritage Lane, City, Country
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
