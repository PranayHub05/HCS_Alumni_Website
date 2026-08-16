import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { setSingleDoc } from '../../services/firestore';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';
import shared from './AdminShared.module.css';
import styles from './ManageContact.module.css';

export default function ManageContact() {
  const { contactInfo, socialLinks, refreshData } = useData();
  const [formData, setFormData] = useState({
    email: '', phone: '', alternatePhone: '', address: '', message: '',
    facebook: '', twitter: '', instagram: '', youtube: '', linkedin: '', whatsapp: ''
  });

  useEffect(() => {
    if (contactInfo || socialLinks) {
      setFormData({
        email: contactInfo?.email || '',
        phone: contactInfo?.phone || '',
        alternatePhone: contactInfo?.alternatePhone || '',
        address: contactInfo?.address || '',
        message: contactInfo?.message || '',
        facebook: socialLinks?.facebook || '',
        twitter: socialLinks?.twitter || '',
        instagram: socialLinks?.instagram || '',
        youtube: socialLinks?.youtube || '',
        linkedin: socialLinks?.linkedin || '',
        whatsapp: socialLinks?.whatsapp || ''
      });
    }
  }, [contactInfo, socialLinks]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const contactData = {
        email: formData.email, phone: formData.phone, alternatePhone: formData.alternatePhone,
        address: formData.address, message: formData.message
      };
      const socialData = {
        facebook: formData.facebook, twitter: formData.twitter, instagram: formData.instagram,
        youtube: formData.youtube, linkedin: formData.linkedin, whatsapp: formData.whatsapp
      };
      
      await setSingleDoc('config', 'contactInfo', contactData);
      await setSingleDoc('config', 'socialLinks', socialData);
      
      toast.success('Contact information updated');
      refreshData();
    } catch (err) {
      toast.error('Error saving data');
    }
  };

  return (
    <div className={shared.adminPage}>
      <div className={shared.pageHeader}>
        <h1>Manage Contact Info</h1>
      </div>

      <form onSubmit={handleSave} className={`${shared.form} ${styles.container}`}>
        
        <div>
          <h2 className={styles.sectionTitle}>Contact Details</h2>
          <div className={shared.formRow}>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Email</label>
              <input type="email" className={shared.formInput} value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} />
            </div>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Phone</label>
              <input type="text" className={shared.formInput} value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Alternate Phone</label>
            <input type="text" className={shared.formInput} value={formData.alternatePhone} onChange={e=>setFormData({...formData, alternatePhone: e.target.value})} />
          </div>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Address</label>
            <textarea className={shared.formTextarea} value={formData.address} onChange={e=>setFormData({...formData, address: e.target.value})}></textarea>
          </div>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Contact Message</label>
            <textarea className={shared.formTextarea} value={formData.message} onChange={e=>setFormData({...formData, message: e.target.value})}></textarea>
          </div>
        </div>

        <div>
          <h2 className={styles.sectionTitle}>Social Links</h2>
          <div className={shared.formRow}>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Facebook URL</label>
              <input type="url" className={shared.formInput} value={formData.facebook} onChange={e=>setFormData({...formData, facebook: e.target.value})} />
            </div>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Twitter URL</label>
              <input type="url" className={shared.formInput} value={formData.twitter} onChange={e=>setFormData({...formData, twitter: e.target.value})} />
            </div>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Instagram URL</label>
              <input type="url" className={shared.formInput} value={formData.instagram} onChange={e=>setFormData({...formData, instagram: e.target.value})} />
            </div>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>LinkedIn URL</label>
              <input type="url" className={shared.formInput} value={formData.linkedin} onChange={e=>setFormData({...formData, linkedin: e.target.value})} />
            </div>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>YouTube URL</label>
              <input type="url" className={shared.formInput} value={formData.youtube} onChange={e=>setFormData({...formData, youtube: e.target.value})} />
            </div>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>WhatsApp Link</label>
              <input type="url" className={shared.formInput} value={formData.whatsapp} onChange={e=>setFormData({...formData, whatsapp: e.target.value})} />
            </div>
          </div>
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}
