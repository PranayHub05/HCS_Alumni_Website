import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { addDocument, updateDocument, deleteDocument } from '../../services/firestore';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import toast from 'react-hot-toast';
import shared from './AdminShared.module.css';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { formatDateShort } from '../../utils/helpers';

export default function ManageAnnouncements() {
  const { announcements, refreshData } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', content: '', date: new Date().toISOString().split('T')[0], category: 'notice', pinned: false
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ title: '', content: '', date: new Date().toISOString().split('T')[0], category: 'notice', pinned: false });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDocument('announcements', editingItem.id, formData);
        toast.success('Announcement updated');
      } else {
        await addDocument('announcements', formData);
        toast.success('Announcement added');
      }
      setIsModalOpen(false);
      refreshData();
    } catch (err) {
      toast.error('Error saving data');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await deleteDocument('announcements', id);
        toast.success('Announcement deleted');
        refreshData();
      } catch (err) {
        toast.error('Error deleting data');
      }
    }
  };

  return (
    <div className={shared.adminPage}>
      <div className={shared.pageHeader}>
        <h1>Manage Announcements</h1>
        <Button onClick={() => handleOpenModal()} icon={<FiPlus />}>Add New</Button>
      </div>

      <div className={shared.dataTableWrapper}>
        <table className={shared.dataTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Category</th>
              <th>Pinned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements?.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{formatDateShort(item.date)}</td>
                <td style={{textTransform: 'capitalize'}}>{item.category}</td>
                <td>{item.pinned ? 'Yes' : 'No'}</td>
                <td>
                  <div className={shared.actions}>
                    <Button variant="ghost" size="sm" onClick={() => handleOpenModal(item)} icon={<FiEdit2 />} />
                    <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)} icon={<FiTrash2 />} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Announcement' : 'Add Announcement'}>
        <form onSubmit={handleSave} className={shared.form}>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Title</label>
            <input required className={shared.formInput} value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} />
          </div>
          
          <div className={shared.formRow}>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Date</label>
              <input type="date" required className={shared.formInput} value={formData.date} onChange={e=>setFormData({...formData, date: e.target.value})} />
            </div>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Category</label>
              <select className={shared.formSelect} value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})}>
                <option value="notice">Notice</option>
                <option value="event">Event</option>
                <option value="meeting">Meeting</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Content</label>
            <textarea required className={shared.formTextarea} value={formData.content} onChange={e=>setFormData({...formData, content: e.target.value})}></textarea>
          </div>

          <div className={shared.formCheckbox}>
            <input type="checkbox" id="pinned" checked={formData.pinned} onChange={e=>setFormData({...formData, pinned: e.target.checked})} />
            <label htmlFor="pinned" className={shared.formLabel}>Pin to top</label>
          </div>

          <Button type="submit" fullWidth>{editingItem ? 'Update' : 'Save'}</Button>
        </form>
      </Modal>
    </div>
  );
}
