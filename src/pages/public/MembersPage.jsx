import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGrid, FiList, FiUsers } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import ProfileCard from '../../components/ui/ProfileCard';
import FilterBar from '../../components/ui/FilterBar';
import SectionTitle from '../../components/ui/SectionTitle';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { getYearOptions, getInitials } from '../../utils/helpers';
import styles from './MembersPage.module.css';

const MembersPage = () => {
  const { alumni } = useData();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ year: 'all', batch: 'all' });

  // Filter approved alumni
  const approvedAlumni = useMemo(() => {
    return (alumni || []).filter(person => person.status === 'approved');
  }, [alumni]);

  // Compute stats
  const stats = useMemo(() => {
    const total = approvedAlumni.length;
    const uniqueBatches = new Set(approvedAlumni.map(a => a.batch).filter(Boolean)).size;
    
    // Simplistic metric for 'active' - e.g., have profession or bio
    const active = approvedAlumni.filter(a => a.profession || a.bio).length;
    
    return { total, active, uniqueBatches };
  }, [approvedAlumni]);

  // Process filtered data
  const filteredAlumni = useMemo(() => {
    return approvedAlumni.filter(person => {
      // Search match
      const searchMatch = person.name.toLowerCase().includes(search.toLowerCase());
      
      // Year match
      const yearMatch = filters.year === 'all' || person.yearOfPassing === filters.year;
      
      // Batch match
      const batchMatch = filters.batch === 'all' || person.batch === filters.batch;
      
      return searchMatch && yearMatch && batchMatch;
    });
  }, [approvedAlumni, search, filters]);

  const yearOptions = getYearOptions();
  const filterConfig = [
    {
      label: 'Year of Passing',
      value: 'year',
      options: [{ label: 'All Years', value: 'all' }, ...yearOptions.map(y => ({ label: y, value: y }))]
    },
    {
      label: 'Batch',
      value: 'batch',
      options: [
        { label: 'All Batches', value: 'all' },
        { label: 'Science', value: 'Science' },
        { label: 'Commerce', value: 'Commerce' },
        { label: 'Arts', value: 'Arts' }
      ]
    }
  ];

  const handleFilterChange = (filterId, value) => {
    setFilters(prev => ({ ...prev, [filterId]: value }));
  };

  return (
    <div className={styles.membersPage}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <SectionTitle 
            title="Our Members" 
            subtitle="The heart and soul of our alumni community"
            light
            centered
          />
        </div>
      </header>

      <main className={styles.content}>
        <ScrollReveal>
          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>
                <FiUsers />
                {stats.total}
              </div>
              <div className={styles.statLabel}>Total Members</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{stats.active}</div>
              <div className={styles.statLabel}>Active Profiles</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{stats.uniqueBatches}</div>
              <div className={styles.statLabel}>Batches Represented</div>
            </div>
          </div>
        </ScrollReveal>

        <div className={styles.controls}>
          <div className={styles.filterWrapper}>
            <FilterBar 
              searchValue={search}
              onSearchChange={setSearch}
              filters={filterConfig}
              activeFilters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          <div className={styles.viewControls}>
            <button 
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.activeView : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
            >
              <FiGrid size={20} />
            </button>
            <button 
              className={`${styles.viewBtn} ${viewMode === 'list' ? styles.activeView : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List View"
            >
              <FiList size={20} />
            </button>
          </div>
        </div>

        <ScrollReveal>
          <div className={viewMode === 'grid' ? styles.grid : styles.list}>
            <AnimatePresence mode="popLayout">
              {filteredAlumni.length > 0 ? (
                filteredAlumni.map(person => (
                  <motion.div
                    key={person.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    {viewMode === 'grid' ? (
                      <ProfileCard 
                        name={person.name}
                        photo={person.photo}
                        designation={person.profession}
                        variant="default"
                        details={[
                          { label: 'Year', value: person.yearOfPassing },
                          { label: 'Batch', value: person.batch },
                          { label: 'Profession', value: person.profession },
                          { label: 'Location', value: person.location }
                        ]}
                        bio={person.bio}
                      />
                    ) : (
                      <div className={styles.listItem}>
                        {person.photo ? (
                          <img src={person.photo} alt={person.name} className={styles.listPhoto} />
                        ) : (
                          <div className={styles.listInitials}>{getInitials(person.name)}</div>
                        )}
                        <div className={styles.listInfo}>
                          <div className={styles.listName}>{person.name}</div>
                          <div className={styles.listDetail}>Class of {person.yearOfPassing}</div>
                          <div className={styles.listDetail}>{person.batch}</div>
                          <div className={styles.listDetail}>{person.profession || '-'}</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  No members found matching your criteria.
                </div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </main>
    </div>
  );
};

export default MembersPage;
