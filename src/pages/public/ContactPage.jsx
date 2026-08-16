import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { submitContactForm } from '../../services/firestore';
import SectionTitle from '../../components/ui/SectionTitle';
import Button from '../../components/ui/Button';
import ScrollReveal from '../../components/ui/ScrollReveal';
import toast from 'react-hot-toast';
import { isValidEmail } from '../../utils/helpers';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  const { contactInfo, socialLinks } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }
    
    if (!isValidEmail(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitContactForm(formData);
      toast.success('Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialIcons = {
    facebook: FaFacebookF,
    twitter: FaTwitter,
    instagram: FaInstagram,
    youtube: FaYoutube,
    linkedin: FaLinkedinIn,
    whatsapp: FaWhatsapp
  };

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <SectionTitle 
            title="Contact Us" 
            subtitle="We would love to hear from you" 
            light={true} 
            centered={true} 
          />
        </div>
      </section>

      <div className={styles.container}>
        {/* Contact Info Cards */}
        <section className={styles.cardsSection}>
          <ScrollReveal direction="up" delay={0.1}>
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <FiMail />
              </div>
              <h3>Email Us</h3>
              <p>{contactInfo?.email || 'contact@hcsalumni.org'}</p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.2}>
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <FiPhone />
              </div>
              <h3>Call Us</h3>
              <p>{contactInfo?.phone || '+1 234 567 8900'}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <FiMapPin />
              </div>
              <h3>Visit Us</h3>
              <p>{contactInfo?.address || '123 Heritage Lane, City, Country'}</p>
            </div>
          </ScrollReveal>
        </section>

        {/* Contact Form Section */}
        <section className={styles.contactSection}>
          <ScrollReveal direction="left" delay={0.2}>
            <div className={styles.formWrapper}>
              <h3>Send a Message</h3>
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email Address"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Message Subject"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={6}
                    required
                  ></textarea>
                </div>
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  disabled={isSubmitting}
                  icon={<FiSend />}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className={styles.infoWrapper}>
              <h3>Connect With Us</h3>
              <p className={styles.messageText}>
                {contactInfo?.message || 'Whether you have a question about our events, membership, or anything else, our team is ready to answer all your questions. Join our community and stay connected with the legacy of our beloved institution.'}
              </p>
              
              <div className={styles.socialSection}>
                <h4>Follow our Socials</h4>
                <div className={styles.socialLinks}>
                  {socialLinks && Object.entries(socialLinks).map(([platform, url]) => {
                    if (!url) return null;
                    const IconComponent = socialIcons[platform.toLowerCase()];
                    if (!IconComponent) return null;
                    
                    return (
                      <a 
                        key={platform} 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.socialIcon}
                        aria-label={`Visit our ${platform} page`}
                      >
                        <IconComponent />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
