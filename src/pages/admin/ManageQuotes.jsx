import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { addDocument, updateDocument, deleteDocument } from '../../services/firestore';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import toast from 'react-hot-toast';
import shared from './AdminShared.module.css';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function ManageQuotes() {
  const { quotes, refreshData } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({ text: '', author: '' });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ text: '', author: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDocument('quotes', editingItem.id, formData);
        toast.success('Quote updated');
      } else {
        await addDocument('quotes', formData);
        toast.success('Quote added');
      }
      setIsModalOpen(false);
      refreshData();
    } catch (err) {
      toast.error('Error saving data');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quote?')) {
      try {
        await deleteDocument('quotes', id);
        toast.success('Quote deleted');
        refreshData();
      } catch (err) {
        toast.error('Error deleting data');
      }
    }
  };

  return (
    <div className={shared.adminPage}>
      <div className={shared.pageHeader}>
        <h1>Manage Quotes</h1>
        <Button onClick={() => handleOpenModal()} icon={<FiPlus />}>Add New</Button>
      </div>

      <div className={shared.dataTableWrapper}>
        <table className={shared.dataTable}>
          <thead>
            <tr>
              <th>Quote</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes?.map(item => (
              <tr key={item.id}>
                <td>"{item.text.length > 50 ? item.text.substring(0, 50) + '...' : item.text}"</td>
                <td>{item.author}</td>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Quote' : 'Add Quote'}>
        <form onSubmit={handleSave} className={shared.form}>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Quote Text</label>
            <textarea required className={shared.formTextarea} value={formData.text} onChange={e=>setFormData({...formData, text: e.target.value})}></textarea>
          </div>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Author</label>
            <input required className={shared.formInput} value={formData.author} onChange={e=>setFormData({...formData, author: e.target.value})} />
          </div>
          <Button type="submit" fullWidth>{editingItem ? 'Update' : 'Save'}</Button>
        </form>
      </Modal>
    </div>
  );
}
