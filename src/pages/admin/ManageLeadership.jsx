import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { addDocument, updateDocument, deleteDocument } from '../../services/firestore';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import toast from 'react-hot-toast';
import shared from './AdminShared.module.css';
import styles from './ManageLeadership.module.css';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function ManageLeadership() {
  const { leadership, refreshData } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', designation: '', bio: '', email: '', phone: '', order: 0
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ name: '', designation: '', bio: '', email: '', phone: '', order: 0 });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDocument('leadership', editingItem.id, formData);
        toast.success('Leadership member updated');
      } else {
        await addDocument('leadership', formData);
        toast.success('Leadership member added');
      }
      setIsModalOpen(false);
      refreshData();
    } catch (err) {
      toast.error('Error saving data');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await deleteDocument('leadership', id);
        toast.success('Member deleted');
        refreshData();
      } catch (err) {
        toast.error('Error deleting data');
      }
    }
  };

  return (
    <div className={shared.adminPage}>
      <div className={shared.pageHeader}>
        <h1>Manage Leadership</h1>
        <Button onClick={() => handleOpenModal()} icon={<FiPlus />}>Add New</Button>
      </div>

      <div className={shared.dataTableWrapper}>
        <table className={shared.dataTable}>
          <thead>
            <tr>
              <th>Order</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leadership?.sort((a,b)=>a.order - b.order).map(item => (
              <tr key={item.id}>
                <td>{item.order}</td>
                <td>{item.name}</td>
                <td>{item.designation}</td>
                <td>{item.email}</td>
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
        {(!leadership || leadership.length === 0) && (
          <div className={shared.emptyState}>No leadership members found.</div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Member' : 'Add Member'}>
        <form onSubmit={handleSave} className={shared.form}>
          <div className={shared.formRow}>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Name</label>
              <input required className={shared.formInput} value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} />
            </div>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Designation</label>
              <input required className={shared.formInput} value={formData.designation} onChange={e=>setFormData({...formData, designation: e.target.value})} />
            </div>
          </div>
          
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
            <label className={shared.formLabel}>Order</label>
            <input type="number" className={shared.formInput} value={formData.order} onChange={e=>setFormData({...formData, order: Number(e.target.value)})} />
          </div>

          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Bio</label>
            <textarea className={shared.formTextarea} value={formData.bio} onChange={e=>setFormData({...formData, bio: e.target.value})}></textarea>
          </div>
          
          <Button type="submit" fullWidth>{editingItem ? 'Update' : 'Save'}</Button>
        </form>
      </Modal>
    </div>
  );
}
