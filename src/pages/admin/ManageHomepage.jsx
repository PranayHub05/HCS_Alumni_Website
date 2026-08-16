import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { setSingleDoc } from '../../services/firestore';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';
import shared from './AdminShared.module.css';

export default function ManageHomepage() {
  const { siteConfig, refreshData } = useData();
  const [formData, setFormData] = useState({
    heroTitle: '', heroSubtitle: '', joinButtonText: '', leadershipButtonText: '', slogan: '', footerText: ''
  });

  useEffect(() => {
    if (siteConfig) {
      setFormData({
        heroTitle: siteConfig.heroTitle || '',
        heroSubtitle: siteConfig.heroSubtitle || '',
        joinButtonText: siteConfig.joinButtonText || '',
        leadershipButtonText: siteConfig.leadershipButtonText || '',
        slogan: siteConfig.slogan || '',
        footerText: siteConfig.footerText || ''
      });
    }
  }, [siteConfig]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await setSingleDoc('config', 'siteConfig', formData);
      toast.success('Homepage settings updated');
      refreshData();
    } catch (err) {
      toast.error('Error saving data');
    }
  };

  return (
    <div className={shared.adminPage}>
      <div className={shared.pageHeader}>
        <h1>Manage Homepage Settings</h1>
      </div>

      <form onSubmit={handleSave} className={shared.form}>
        <div className={shared.formGroup}>
          <label className={shared.formLabel}>Hero Title</label>
          <input className={shared.formInput} value={formData.heroTitle} onChange={e=>setFormData({...formData, heroTitle: e.target.value})} />
        </div>
        <div className={shared.formGroup}>
          <label className={shared.formLabel}>Hero Subtitle</label>
          <textarea className={shared.formTextarea} value={formData.heroSubtitle} onChange={e=>setFormData({...formData, heroSubtitle: e.target.value})}></textarea>
        </div>
        
        <div className={shared.formRow}>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Join Button Text</label>
            <input className={shared.formInput} value={formData.joinButtonText} onChange={e=>setFormData({...formData, joinButtonText: e.target.value})} />
          </div>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Leadership Button Text</label>
            <input className={shared.formInput} value={formData.leadershipButtonText} onChange={e=>setFormData({...formData, leadershipButtonText: e.target.value})} />
          </div>
        </div>

        <div className={shared.formGroup}>
          <label className={shared.formLabel}>Site Slogan</label>
          <input className={shared.formInput} value={formData.slogan} onChange={e=>setFormData({...formData, slogan: e.target.value})} />
        </div>

        <div className={shared.formGroup}>
          <label className={shared.formLabel}>Footer Text</label>
          <input className={shared.formInput} value={formData.footerText} onChange={e=>setFormData({...formData, footerText: e.target.value})} />
        </div>

        <Button type="submit">Save Settings</Button>
      </form>
    </div>
  );
}
