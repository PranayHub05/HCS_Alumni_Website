import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { addDocument, updateDocument, deleteDocument } from '../../services/firestore';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import toast from 'react-hot-toast';
import shared from './AdminShared.module.css';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function ManageTeachers() {
  const { exTeachers, refreshData } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', subject: '', yearsServed: '', notes: '', tribute: ''
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ name: '', subject: '', yearsServed: '', notes: '', tribute: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDocument('exTeachers', editingItem.id, formData);
        toast.success('Teacher updated');
      } else {
        await addDocument('exTeachers', formData);
        toast.success('Teacher added');
      }
      setIsModalOpen(false);
      refreshData();
    } catch (err) {
      toast.error('Error saving data');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await deleteDocument('exTeachers', id);
        toast.success('Teacher deleted');
        refreshData();
      } catch (err) {
        toast.error('Error deleting data');
      }
    }
  };

  return (
    <div className={shared.adminPage}>
      <div className={shared.pageHeader}>
        <h1>Manage Ex Teachers</h1>
        <Button onClick={() => handleOpenModal()} icon={<FiPlus />}>Add New</Button>
      </div>

      <div className={shared.dataTableWrapper}>
        <table className={shared.dataTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Years Served</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exTeachers?.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.subject}</td>
                <td>{item.yearsServed}</td>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Teacher' : 'Add Teacher'}>
        <form onSubmit={handleSave} className={shared.form}>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Name</label>
            <input required className={shared.formInput} value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} />
          </div>
          <div className={shared.formRow}>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Subject</label>
              <input className={shared.formInput} value={formData.subject} onChange={e=>setFormData({...formData, subject: e.target.value})} />
            </div>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Years Served (e.g. 1990-2010)</label>
              <input className={shared.formInput} value={formData.yearsServed} onChange={e=>setFormData({...formData, yearsServed: e.target.value})} />
            </div>
          </div>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Notes</label>
            <input className={shared.formInput} value={formData.notes} onChange={e=>setFormData({...formData, notes: e.target.value})} />
          </div>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Tribute</label>
            <textarea className={shared.formTextarea} value={formData.tribute} onChange={e=>setFormData({...formData, tribute: e.target.value})}></textarea>
          </div>
          <Button type="submit" fullWidth>{editingItem ? 'Update' : 'Save'}</Button>
        </form>
      </Modal>
    </div>
  );
}
