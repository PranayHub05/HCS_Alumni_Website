import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { addDocument, updateDocument, deleteDocument } from '../../services/firestore';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import toast from 'react-hot-toast';
import shared from './AdminShared.module.css';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function ManageAlumni() {
  const { alumni, refreshData } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', yearOfPassing: '', batch: '', profession: '', location: '', bio: '', status: 'Active', approved: true
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ name: '', yearOfPassing: '', batch: '', profession: '', location: '', bio: '', status: 'Active', approved: true });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDocument('alumni', editingItem.id, formData);
        toast.success('Alumni updated');
      } else {
        await addDocument('alumni', formData);
        toast.success('Alumni added');
      }
      setIsModalOpen(false);
      refreshData();
    } catch (err) {
      toast.error('Error saving data');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this alumni?')) {
      try {
        await deleteDocument('alumni', id);
        toast.success('Alumni deleted');
        refreshData();
      } catch (err) {
        toast.error('Error deleting data');
      }
    }
  };

  return (
    <div className={shared.adminPage}>
      <div className={shared.pageHeader}>
        <h1>Manage Alumni</h1>
        <Button onClick={() => handleOpenModal()} icon={<FiPlus />}>Add New</Button>
      </div>

      <div className={shared.dataTableWrapper}>
        <table className={shared.dataTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Batch / Year</th>
              <th>Profession</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alumni?.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.batch} ({item.yearOfPassing})</td>
                <td>{item.profession}</td>
                <td>
                  <span className={item.status === 'Active' ? shared.statusActive : shared.statusInactive}>
                    {item.status}
                  </span>
                </td>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Alumni' : 'Add Alumni'}>
        <form onSubmit={handleSave} className={shared.form}>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Name</label>
            <input required className={shared.formInput} value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} />
          </div>
          <div className={shared.formRow}>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Year of Passing</label>
              <input type="number" required className={shared.formInput} value={formData.yearOfPassing} onChange={e=>setFormData({...formData, yearOfPassing: e.target.value})} />
            </div>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Batch</label>
              <input className={shared.formInput} value={formData.batch} onChange={e=>setFormData({...formData, batch: e.target.value})} />
            </div>
          </div>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Profession</label>
            <input className={shared.formInput} value={formData.profession} onChange={e=>setFormData({...formData, profession: e.target.value})} />
          </div>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Location</label>
            <input className={shared.formInput} value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} />
          </div>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Bio</label>
            <textarea className={shared.formTextarea} value={formData.bio} onChange={e=>setFormData({...formData, bio: e.target.value})}></textarea>
          </div>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Status</label>
            <select className={shared.formSelect} value={formData.status} onChange={e=>setFormData({...formData, status: e.target.value})}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <Button type="submit" fullWidth>{editingItem ? 'Update' : 'Save'}</Button>
        </form>
      </Modal>
    </div>
  );
}
