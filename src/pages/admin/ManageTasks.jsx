import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { addDocument, updateDocument, deleteDocument } from '../../services/firestore';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import toast from 'react-hot-toast';
import shared from './AdminShared.module.css';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { formatDateShort } from '../../utils/helpers';

export default function ManageTasks() {
  const { tasks, refreshData } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', description: '', status: 'pending', assignedTo: '', deadline: '', progress: 0
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ title: '', description: '', status: 'pending', assignedTo: '', deadline: '', progress: 0 });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateDocument('tasks', editingItem.id, formData);
        toast.success('Task updated');
      } else {
        await addDocument('tasks', formData);
        toast.success('Task added');
      }
      setIsModalOpen(false);
      refreshData();
    } catch (err) {
      toast.error('Error saving data');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteDocument('tasks', id);
        toast.success('Task deleted');
        refreshData();
      } catch (err) {
        toast.error('Error deleting data');
      }
    }
  };

  return (
    <div className={shared.adminPage}>
      <div className={shared.pageHeader}>
        <h1>Manage Tasks</h1>
        <Button onClick={() => handleOpenModal()} icon={<FiPlus />}>Add New</Button>
      </div>

      <div className={shared.dataTableWrapper}>
        <table className={shared.dataTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Assigned To</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.assignedTo}</td>
                <td>{item.deadline ? formatDateShort(item.deadline) : '-'}</td>
                <td>
                  <span className={item.status === 'completed' ? shared.statusCompleted : item.status === 'in-progress' ? shared.statusInProgress : shared.statusPending}>
                    {item.status.replace('-', ' ')}
                  </span>
                </td>
                <td>{item.progress}%</td>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Task' : 'Add Task'}>
        <form onSubmit={handleSave} className={shared.form}>
          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Title</label>
            <input required className={shared.formInput} value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} />
          </div>
          
          <div className={shared.formRow}>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Assigned To</label>
              <input className={shared.formInput} value={formData.assignedTo} onChange={e=>setFormData({...formData, assignedTo: e.target.value})} />
            </div>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Deadline</label>
              <input type="date" className={shared.formInput} value={formData.deadline} onChange={e=>setFormData({...formData, deadline: e.target.value})} />
            </div>
          </div>

          <div className={shared.formGroup}>
            <label className={shared.formLabel}>Description</label>
            <textarea className={shared.formTextarea} value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})}></textarea>
          </div>

          <div className={shared.formRow}>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Status</label>
              <select className={shared.formSelect} value={formData.status} onChange={e=>setFormData({...formData, status: e.target.value})}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className={shared.formGroup}>
              <label className={shared.formLabel}>Progress ({formData.progress}%)</label>
              <input type="range" min="0" max="100" className={shared.formInput} value={formData.progress} onChange={e=>setFormData({...formData, progress: Number(e.target.value)})} />
            </div>
          </div>

          <Button type="submit" fullWidth>{editingItem ? 'Update' : 'Save'}</Button>
        </form>
      </Modal>
    </div>
  );
}
