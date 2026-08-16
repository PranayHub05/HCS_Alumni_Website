/* Utility helper functions */

/**
 * Format a date string to a readable format.
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format a date string to a short format.
 */
export const formatDateShort = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Truncate text to a maximum length with ellipsis.
 */
export const truncateText = (text, maxLength = 120) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '…';
};

/**
 * Get status color class based on task/request status.
 */
export const getStatusColor = (status) => {
  const map = {
    pending: 'var(--color-pending)',
    'in-progress': 'var(--color-in-progress)',
    completed: 'var(--color-completed)',
    approved: 'var(--color-completed)',
    rejected: 'var(--color-error)',
    urgent: 'var(--color-urgent)',
  };
  return map[status?.toLowerCase()] || 'var(--color-muted-text)';
};

/**
 * Get status label for display.
 */
export const getStatusLabel = (status) => {
  const map = {
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Completed',
    approved: 'Approved',
    rejected: 'Rejected',
    urgent: 'Urgent',
  };
  return map[status?.toLowerCase()] || status;
};

/**
 * Get category badge styles.
 */
export const getCategoryStyle = (category) => {
  const map = {
    notice: { bg: '#E3F2FD', color: '#1565C0' },
    event: { bg: '#F3E5F5', color: '#7B1FA2' },
    meeting: { bg: '#E8F5E9', color: '#2E7D32' },
    urgent: { bg: '#FFEBEE', color: '#C62828' },
    general: { bg: '#FFF8E1', color: '#F57F17' },
  };
  return map[category?.toLowerCase()] || map.general;
};

/**
 * Generate initials from a name.
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

/**
 * Debounce a function.
 */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Generate unique ID.
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate email format.
 */
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Validate phone format (Indian).
 */
export const isValidPhone = (phone) => {
  return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(phone.replace(/\s/g, ''));
};

/**
 * Scroll to element by ID.
 */
export const scrollToElement = (elementId) => {
  const el = document.getElementById(elementId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/**
 * Get year list for filters.
 */
export const getYearOptions = (startYear = 1970) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= startYear; y--) {
    years.push(y.toString());
  }
  return years;
};
