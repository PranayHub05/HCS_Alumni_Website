import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { submitMembershipRequest } from '../../services/firestore';
import { uploadFile } from '../../services/storage';
import SectionTitle from '../../components/ui/SectionTitle';
import Button from '../../components/ui/Button';
import ScrollReveal from '../../components/ui/ScrollReveal';
import toast from 'react-hot-toast';
import { isValidEmail, isValidPhone, getYearOptions } from '../../utils/helpers';
import { FiUsers, FiCalendar, FiHeart, FiAward, FiBook, FiStar, FiCheck, FiUpload } from 'react-icons/fi';
import styles from './MembershipPage.module.css';

const MembershipPage = () => {
  const { membershipInfo } = useData();
  const yearOptions = getYearOptions();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    yearOfPassing: '',
    batch: '',
    currentProfession: '',
    currentLocation: '',
    bio: ''
  });
  
  const [photo, setPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const iconMap = {
    network: FiUsers,
    events: FiCalendar,
    mentorship: FiHeart,
    scholarship: FiAward,
    directory: FiBook,
    recognition: FiStar
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ['fullName', 'email', 'phone', 'yearOfPassing', 'batch', 'currentProfession'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
        return;
      }
    }
    
    if (!isValidEmail(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    
    if (!isValidPhone(formData.phone)) {
      toast.error('Please enter a valid phone number.');
      return;
    }

    try {
      setIsSubmitting(true);
      
      let photoUrl = '';
      if (photo) {
        photoUrl = await uploadFile(photo, `membership_photos/${Date.now()}_${photo.name}`);
      }
      
      const requestData = {
        ...formData,
        photoUrl,
        status: 'pending',
        appliedAt: new Date().toISOString()
      };
      
      await submitMembershipRequest(requestData);
      
      toast.success('Application submitted! You will be notified once approved.');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        yearOfPassing: '',
        batch: '',
        currentProfession: '',
        currentLocation: '',
        bio: ''
      });
      setPhoto(null);
      // Reset file input visually
      const fileInput = document.getElementById('photo');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fallback data if context is empty
  const introText = membershipInfo?.intro || "The HCS Alumni Association brings together generations of students who have walked the halls of our esteemed institution. Becoming a member allows you to reconnect with old friends, forge new professional relationships, and contribute to the growth of current students.";
  
  const benefits = membershipInfo?.benefits || [
    { icon: 'network', title: 'Professional Network', description: 'Connect with alumni across various industries globally.' },
    { icon: 'events', title: 'Exclusive Events', description: 'Get invitations to alumni reunions, galas, and networking events.' },
    { icon: 'mentorship', title: 'Mentorship', description: 'Guide current students or find a mentor for your own career growth.' }
  ];
  
  const eligibility = membershipInfo?.eligibility || [
    "Must have completed at least one academic year at HCS",
    "Must be willing to uphold the values and reputation of the institution",
    "Must complete the application form with verifiable details"
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <SectionTitle 
            title="Membership" 
            subtitle="Join the legacy, be part of the community" 
            light={true} 
            centered={true} 
          />
        </div>
      </section>

      <div className={styles.container}>
        {/* Introduction */}
        <section className={styles.introSection}>
          <ScrollReveal direction="up">
            <div className={styles.introBox}>
              <p className={styles.introText}>{introText}</p>
            </div>
          </ScrollReveal>
        </section>

        {/* Benefits Section */}
        <section className={styles.benefitsSection}>
          <SectionTitle title="Why Join Us?" centered={true} />
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon] || FiStar;
              return (
                <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                  <div className={styles.benefitCard}>
                    <div className={styles.iconWrapper}>
                      <Icon />
                    </div>
                    <h4>{benefit.title}</h4>
                    <p>{benefit.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* Eligibility & Form Container */}
        <div className={styles.contentGrid}>
          {/* Eligibility Section */}
          <section className={styles.eligibilitySection}>
            <ScrollReveal direction="left">
              <div className={styles.eligibilityBox}>
                <SectionTitle title="Eligibility" />
                <ul className={styles.eligibilityList}>
                  {eligibility.map((item, index) => (
                    <li key={index}>
                      <span className={styles.checkIcon}><FiCheck /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className={styles.decorativeElements}>
                  <div className={styles.circle1}></div>
                  <div className={styles.circle2}></div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Application Form */}
          <section className={styles.formSection}>
            <ScrollReveal direction="right">
              <div className={styles.formWrapper}>
                <SectionTitle title="Apply for Membership" />
                <form onSubmit={handleSubmit} className={styles.applicationForm}>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="fullName">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. john@example.com"
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +1 234 567 8900"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="yearOfPassing">Year of Passing *</label>
                      <select
                        id="yearOfPassing"
                        name="yearOfPassing"
                        value={formData.yearOfPassing}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Year</option>
                        {yearOptions.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="batch">Batch / Stream *</label>
                      <select
                        id="batch"
                        name="batch"
                        value={formData.batch}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Stream</option>
                        <option value="Science">Science</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Arts">Arts</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="currentProfession">Current Profession *</label>
                      <input
                        type="text"
                        id="currentProfession"
                        name="currentProfession"
                        value={formData.currentProfession}
                        onChange={handleChange}
                        placeholder="e.g. Software Engineer at XYZ"
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="currentLocation">Current Location</label>
                      <input
                        type="text"
                        id="currentLocation"
                        name="currentLocation"
                        value={formData.currentLocation}
                        onChange={handleChange}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="bio">Short Bio (Optional)</label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us a bit about your journey after HCS..."
                        rows={4}
                      ></textarea>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="photo">Profile Photo (Optional)</label>
                      <div className={styles.fileInputWrapper}>
                        <input
                          type="file"
                          id="photo"
                          name="photo"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className={styles.fileInput}
                        />
                        <div className={styles.fileCustomBtn}>
                          <FiUpload /> {photo ? photo.name : 'Choose Image'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.submitWrapper}>
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      fullWidth 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                    </Button>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
