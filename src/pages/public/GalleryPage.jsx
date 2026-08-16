import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import ProfileCard from '../../components/ui/ProfileCard';
import FilterBar from '../../components/ui/FilterBar';
import SectionTitle from '../../components/ui/SectionTitle';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { getYearOptions } from '../../utils/helpers';
import styles from './GalleryPage.module.css';

const GalleryPage = () => {
  const { alumni, exTeachers } = useData();
  const [activeTab, setActiveTab] = useState('alumni'); // 'alumni' or 'teachers'
  
  // Filters for Alumni
  const [alumniSearch, setAlumniSearch] = useState('');
  const [alumniFilters, setAlumniFilters] = useState({ year: 'all', batch: 'all' });
  
  // Filters for Teachers
  const [teacherSearch, setTeacherSearch] = useState('');

  // Process Alumni data
  const filteredAlumni = useMemo(() => {
    if (!alumni) return [];
    
    return alumni.filter(person => {
      // Must be approved
      if (person.status !== 'approved') return false;
      
      // Search match
      const searchMatch = person.name.toLowerCase().includes(alumniSearch.toLowerCase());
      
      // Year match
      const yearMatch = alumniFilters.year === 'all' || person.yearOfPassing === alumniFilters.year;
      
      // Batch match
      const batchMatch = alumniFilters.batch === 'all' || person.batch === alumniFilters.batch;
      
      return searchMatch && yearMatch && batchMatch;
    });
  }, [alumni, alumniSearch, alumniFilters]);

  // Process Teachers data
  const filteredTeachers = useMemo(() => {
    if (!exTeachers) return [];
    
    return exTeachers.filter(teacher => 
      teacher.name.toLowerCase().includes(teacherSearch.toLowerCase())
    );
  }, [exTeachers, teacherSearch]);

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

  const handleAlumniFilterChange = (filterId, value) => {
    setAlumniFilters(prev => ({ ...prev, [filterId]: value }));
  };

  return (
    <div className={styles.galleryPage}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <SectionTitle 
            title="Alumni Gallery" 
            subtitle="Our proud community of Collegians and beloved teachers"
            light
            centered
          />
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'alumni' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('alumni')}
          >
            Active Members
            {activeTab === 'alumni' && (
              <motion.div layoutId="activeTab" className={styles.activeIndicator} />
            )}
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'teachers' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('teachers')}
          >
            Ex Teachers
            {activeTab === 'teachers' && (
              <motion.div layoutId="activeTab" className={styles.activeIndicator} />
            )}
          </button>
        </div>

        {activeTab === 'alumni' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className={styles.filterSection}>
              <FilterBar 
                searchValue={alumniSearch}
                onSearchChange={setAlumniSearch}
                filters={filterConfig}
                activeFilters={alumniFilters}
                onFilterChange={handleAlumniFilterChange}
              />
              <div className={styles.resultCount}>
                Showing {filteredAlumni.length} alumni
              </div>
            </div>

            <ScrollReveal>
              <div className={styles.grid}>
                <AnimatePresence>
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
                      </motion.div>
                    ))
                  ) : (
                    <div className={styles.emptyState}>
                      No alumni found matching your filters.
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </motion.div>
        )}

        {activeTab === 'teachers' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className={styles.filterSection}>
              <FilterBar 
                searchValue={teacherSearch}
                onSearchChange={setTeacherSearch}
                filters={[]} 
                activeFilters={{}}
                onFilterChange={() => {}}
              />
              <div className={styles.resultCount}>
                Showing {filteredTeachers.length} teachers
              </div>
            </div>

            <ScrollReveal>
              <div className={styles.grid}>
                <AnimatePresence>
                  {filteredTeachers.length > 0 ? (
                    filteredTeachers.map(teacher => (
                      <motion.div
                        key={teacher.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ProfileCard 
                          name={teacher.name}
                          photo={teacher.photo}
                          variant="teacher"
                          details={[
                            { label: 'Subject', value: teacher.subject },
                            { label: 'Years Served', value: teacher.yearsServed }
                          ]}
                          bio={teacher.bio || teacher.tribute}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <div className={styles.emptyState}>
                      No teachers found matching your search.
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default GalleryPage;
