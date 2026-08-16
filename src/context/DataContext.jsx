import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchCollection, fetchSingleDoc } from '../services/firestore';
import * as defaults from '../data/defaults';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState({
    quotes: defaults.defaultQuotes,
    leadership: defaults.defaultLeadership,
    alumni: defaults.defaultAlumni,
    exTeachers: defaults.defaultTeachers,
    announcements: defaults.defaultAnnouncements,
    tasks: defaults.defaultTasks,
    contactInfo: defaults.defaultContactInfo,
    socialLinks: defaults.defaultSocialLinks,
    schoolHistory: defaults.defaultSchoolHistory,
    membershipRequests: [],
    siteConfig: defaults.defaultSiteConfig,
    membershipInfo: defaults.defaultMembershipInfo,
  });

  const [loading, setLoading] = useState(true);

  const loadAllData = useCallback(async () => {
    try {
      const [
        quotes,
        leadership,
        alumni,
        exTeachers,
        announcements,
        tasks,
        membershipRequests,
        contactInfo,
        socialLinks,
        schoolHistory,
        siteConfig,
        membershipInfo,
      ] = await Promise.all([
        fetchCollection('quotes'),
        fetchCollection('leadership'),
        fetchCollection('alumni'),
        fetchCollection('exTeachers'),
        fetchCollection('announcements'),
        fetchCollection('tasks'),
        fetchCollection('membershipRequests'),
        fetchSingleDoc('contactInfo'),
        fetchSingleDoc('socialLinks'),
        fetchSingleDoc('schoolHistory'),
        fetchSingleDoc('siteConfig'),
        fetchSingleDoc('membershipInfo'),
      ]);

      setData({
        quotes: quotes.length ? quotes : defaults.defaultQuotes,
        leadership: leadership.length ? leadership : defaults.defaultLeadership,
        alumni: alumni.length ? alumni : defaults.defaultAlumni,
        exTeachers: exTeachers.length ? exTeachers : defaults.defaultTeachers,
        announcements: announcements.length ? announcements : defaults.defaultAnnouncements,
        tasks: tasks.length ? tasks : defaults.defaultTasks,
        membershipRequests,
        contactInfo: Object.keys(contactInfo).length ? contactInfo : defaults.defaultContactInfo,
        socialLinks: Object.keys(socialLinks).length ? socialLinks : defaults.defaultSocialLinks,
        schoolHistory: schoolHistory.sections ? schoolHistory : defaults.defaultSchoolHistory,
        siteConfig: Object.keys(siteConfig).length ? siteConfig : defaults.defaultSiteConfig,
        membershipInfo: membershipInfo.benefits ? membershipInfo : defaults.defaultMembershipInfo,
      });
    } catch (error) {
      console.error('[Data] Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const refreshData = useCallback(async (collection) => {
    if (collection) {
      // Refresh specific collection
      const isArray = Array.isArray(data[collection]);
      const result = isArray
        ? await fetchCollection(collection)
        : await fetchSingleDoc(collection);

      setData((prev) => ({
        ...prev,
        [collection]: isArray
          ? (result.length ? result : defaults[`default${collection.charAt(0).toUpperCase() + collection.slice(1)}`] || prev[collection])
          : (Object.keys(result).length ? result : prev[collection]),
      }));
    } else {
      // Refresh all
      await loadAllData();
    }
  }, [data, loadAllData]);

  const value = {
    ...data,
    loading,
    refreshData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export default DataContext;
