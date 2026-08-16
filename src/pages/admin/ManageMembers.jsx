import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { approveMembershipRequest, rejectMembershipRequest } from '../../services/firestore';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import toast from 'react-hot-toast';
import shared from './AdminShared.module.css';
import styles from './ManageMembers.module.css';
import { formatDateShort } from '../../utils/helpers';
import { FiEye, FiCheck, FiX } from 'react-icons/fi';

export default function ManageMembers() {
  const { membershipRequests, refreshData } = useData();
  const [filter, setFilter] = useState('All');
  const [selectedReq, setSelectedReq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRequests = membershipRequests?.filter(req => {
    if (filter === 'All') return true;
    return req.status.toLowerCase() === filter.toLowerCase();
  });

  const handleApprove = async (id) => {
    if (window.confirm('Approve this membership request? This will create an alumni record.')) {
      try {
        await approveMembershipRequest(id);
        toast.success('Request approved');
        refreshData();
        setIsModalOpen(false);
      } catch (err) {
        toast.error('Error approving request');
      }
    }
  };

  const handleReject = async (id) => {
    if (window.confirm('Reject this membership request?')) {
      try {
        await rejectMembershipRequest(id);
        toast.success('Request rejected');
        refreshData();
        setIsModalOpen(false);
      } catch (err) {
        toast.error('Error rejecting request');
      }
    }
  };

  const openDetails = (req) => {
    setSelectedReq(req);
    setIsModalOpen(true);
  };

  return (
    <div className={shared.adminPage}>
      <div className={shared.pageHeader}>
        <h1>Membership Requests</h1>
      </div>

      <div className={styles.filterTabs}>
        {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
          <button 
            key={f} 
            className={`${styles.tab} ${filter === f ? styles.activeTab : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className={shared.dataTableWrapper}>
        <table className={shared.dataTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Batch</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests?.map(item => (
              <tr key={item.id}>
                <td>{item.submittedAt ? formatDateShort(item.submittedAt) : '-'}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.batch} ({item.yearOfPassing})</td>
                <td>
                  <span className={
                    item.status === 'approved' ? shared.statusApproved : 
                    item.status === 'rejected' ? shared.statusRejected : shared.statusPending
                  }>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className={shared.actions}>
                    <Button variant="ghost" size="sm" onClick={() => openDetails(item)} icon={<FiEye />} />
                    {item.status === 'pending' && (
                      <>
                        <Button variant="primary" size="sm" onClick={() => handleApprove(item.id)} icon={<FiCheck />} />
                        <Button variant="danger" size="sm" onClick={() => handleReject(item.id)} icon={<FiX />} />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!filteredRequests || filteredRequests.length === 0) && (
          <div className={shared.emptyState}>No requests found for this filter.</div>
        )}
      </div>

      {selectedReq && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Request Details">
          <div className={styles.detailGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Name</span>
              <span className={styles.detailValue}>{selectedReq.name}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Email</span>
              <span className={styles.detailValue}>{selectedReq.email}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Phone</span>
              <span className={styles.detailValue}>{selectedReq.phone || '-'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Status</span>
              <span className={styles.detailValue} style={{textTransform:'capitalize'}}>{selectedReq.status}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Batch</span>
              <span className={styles.detailValue}>{selectedReq.batch}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Year of Passing</span>
              <span className={styles.detailValue}>{selectedReq.yearOfPassing}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Profession</span>
              <span className={styles.detailValue}>{selectedReq.profession || '-'}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Location</span>
              <span className={styles.detailValue}>{selectedReq.location || '-'}</span>
            </div>
          </div>
          {selectedReq.status === 'pending' && (
            <div className={shared.actions} style={{marginTop: '1rem'}}>
              <Button onClick={() => handleApprove(selectedReq.id)} icon={<FiCheck />} fullWidth>Approve</Button>
              <Button onClick={() => handleReject(selectedReq.id)} variant="danger" icon={<FiX />} fullWidth>Reject</Button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
