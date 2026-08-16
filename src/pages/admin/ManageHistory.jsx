import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { setSingleDoc } from '../../services/firestore';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';
import shared from './AdminShared.module.css';
import styles from './ManageHistory.module.css';
import { FiTrash2, FiPlus } from 'react-icons/fi';

export default function ManageHistory() {
  const { schoolHistory, refreshData } = useData();
  const [intro, setIntro] = useState('');
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (schoolHistory) {
      setIntro(schoolHistory.intro || '');
      setSections(schoolHistory.sections || []);
    }
  }, [schoolHistory]);

  const handleAddSection = () => {
    setSections([...sections, { title: '', content: '' }]);
  };

  const handleRemoveSection = (index) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await setSingleDoc('config', 'schoolHistory', { intro, sections });
      toast.success('School history updated');
      refreshData();
    } catch (err) {
      toast.error('Error saving data');
    }
  };

  return (
    <div className={shared.adminPage}>
      <div className={shared.pageHeader}>
        <h1>Manage School History</h1>
      </div>

      <form onSubmit={handleSave} className={shared.form}>
        <div className={shared.formGroup}>
          <label className={shared.formLabel}>Introduction</label>
          <textarea className={shared.formTextarea} style={{minHeight:'150px'}} value={intro} onChange={e=>setIntro(e.target.value)}></textarea>
        </div>

        <div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '1rem'}}>
            <h3 style={{margin:0}}>History Sections</h3>
            <Button type="button" onClick={handleAddSection} variant="secondary" size="sm" icon={<FiPlus />}>Add Section</Button>
          </div>

          {sections.map((sec, index) => (
            <div key={index} className={styles.sectionBlock}>
              <Button 
                type="button" 
                variant="danger" 
                size="sm" 
                className={styles.removeBtn} 
                onClick={() => handleRemoveSection(index)}
                icon={<FiTrash2 />}
              />
              <div className={shared.formGroup} style={{marginBottom:'1rem'}}>
                <label className={shared.formLabel}>Section Title</label>
                <input required className={shared.formInput} value={sec.title} onChange={e=>handleSectionChange(index, 'title', e.target.value)} />
              </div>
              <div className={shared.formGroup}>
                <label className={shared.formLabel}>Content</label>
                <textarea required className={shared.formTextarea} style={{minHeight:'120px'}} value={sec.content} onChange={e=>handleSectionChange(index, 'content', e.target.value)}></textarea>
              </div>
            </div>
          ))}
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}
