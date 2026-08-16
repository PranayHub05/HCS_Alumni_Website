import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import styles from './FilterBar.module.css';

const FilterBar = ({ searchValue, onSearchChange, filters = [], onFilterChange, resultCount }) => {
  const handleClear = () => {
    onSearchChange('');
    filters.forEach(f => onFilterChange(f.key, ''));
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <FiSearch className={styles.searchIcon} />
        <input 
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.filtersWrapper}>
        {filters.map(filter => (
          <select 
            key={filter.key}
            value={filter.value}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            className={styles.select}
          >
            <option value="">{filter.label}</option>
            {filter.options.map((opt, idx) => {
              const value = typeof opt === 'object' ? opt.value : opt;
              const label = typeof opt === 'object' ? opt.label : opt;
              return <option key={value || idx} value={value}>{label}</option>;
            })}
          </select>
        ))}
      </div>
      
      <div className={styles.actions}>
        {resultCount !== undefined && (
          <span className={styles.resultCount}>
            {resultCount} {resultCount === 1 ? 'result' : 'results'}
          </span>
        )}
        <button className={styles.clearBtn} onClick={handleClear}>
          <FiX /> Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
