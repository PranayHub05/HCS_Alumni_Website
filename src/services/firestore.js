/* Firestore service — CRUD operations for all collections.
   Falls back to local defaults when Firebase is not configured. */

import { isFirebaseConfigured } from './firebase';
import * as defaults from '../data/defaults';

// In-memory store for demo/local mode
let localStore = {
  quotes: [...defaults.defaultQuotes],
  leadership: [...defaults.defaultLeadership],
  alumni: [...defaults.defaultAlumni],
  exTeachers: [...defaults.defaultTeachers],
  announcements: [...defaults.defaultAnnouncements],
  tasks: [...defaults.defaultTasks],
  contactInfo: { ...defaults.defaultContactInfo },
  socialLinks: { ...defaults.defaultSocialLinks },
  schoolHistory: { ...defaults.defaultSchoolHistory },
  membershipRequests: [],
  siteConfig: { ...defaults.defaultSiteConfig },
  membershipInfo: { ...defaults.defaultMembershipInfo },
};

/* ── Generic Firestore Helpers ── */

const getFirestoreHelpers = async () => {
  const { getFirestore, collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, where, setDoc } = await import('firebase/firestore');
  const db = getFirestore();
  return { db, collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, where, setDoc };
};

/* ── Read Collections ── */

export const fetchCollection = async (collectionName) => {
  if (!isFirebaseConfigured()) {
    return localStore[collectionName] || [];
  }

  try {
    const { db, collection, getDocs, query, orderBy } = await getFirestoreHelpers();
    const q = query(collection(db, collectionName));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error(`[Firestore] Error fetching ${collectionName}:`, error);
    return localStore[collectionName] || [];
  }
};

export const fetchDocument = async (collectionName, docId) => {
  if (!isFirebaseConfigured()) {
    if (typeof localStore[collectionName] === 'object' && !Array.isArray(localStore[collectionName])) {
      return localStore[collectionName];
    }
    const arr = localStore[collectionName] || [];
    return arr.find((item) => item.id === docId) || null;
  }

  try {
    const { db, doc, getDoc } = await getFirestoreHelpers();
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error(`[Firestore] Error fetching ${collectionName}/${docId}:`, error);
    return null;
  }
};

/* ── Read Single Docs (for config-like collections) ── */

export const fetchSingleDoc = async (collectionName) => {
  if (!isFirebaseConfigured()) {
    return localStore[collectionName] || {};
  }

  try {
    const { db, doc, getDoc } = await getFirestoreHelpers();
    const docRef = doc(db, collectionName, 'main');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : localStore[collectionName] || {};
  } catch (error) {
    console.error(`[Firestore] Error fetching ${collectionName}:`, error);
    return localStore[collectionName] || {};
  }
};

/* ── Write Operations ── */

export const addDocument = async (collectionName, data) => {
  if (!isFirebaseConfigured()) {
    const newDoc = { ...data, id: `local-${Date.now()}` };
    if (Array.isArray(localStore[collectionName])) {
      localStore[collectionName].push(newDoc);
    }
    return newDoc;
  }

  try {
    const { db, collection, addDoc } = await getFirestoreHelpers();
    const docRef = await addDoc(collection(db, collectionName), data);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error(`[Firestore] Error adding to ${collectionName}:`, error);
    throw error;
  }
};

export const updateDocument = async (collectionName, docId, data) => {
  if (!isFirebaseConfigured()) {
    if (Array.isArray(localStore[collectionName])) {
      const idx = localStore[collectionName].findIndex((item) => item.id === docId);
      if (idx !== -1) {
        localStore[collectionName][idx] = { ...localStore[collectionName][idx], ...data };
      }
    } else {
      localStore[collectionName] = { ...localStore[collectionName], ...data };
    }
    return { id: docId, ...data };
  }

  try {
    const { db, doc, updateDoc } = await getFirestoreHelpers();
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    return { id: docId, ...data };
  } catch (error) {
    console.error(`[Firestore] Error updating ${collectionName}/${docId}:`, error);
    throw error;
  }
};

export const setSingleDoc = async (collectionName, data) => {
  if (!isFirebaseConfigured()) {
    localStore[collectionName] = { ...localStore[collectionName], ...data };
    return data;
  }

  try {
    const { db, doc, setDoc } = await getFirestoreHelpers();
    const docRef = doc(db, collectionName, 'main');
    await setDoc(docRef, data, { merge: true });
    return data;
  } catch (error) {
    console.error(`[Firestore] Error setting ${collectionName}:`, error);
    throw error;
  }
};

export const deleteDocument = async (collectionName, docId) => {
  if (!isFirebaseConfigured()) {
    if (Array.isArray(localStore[collectionName])) {
      localStore[collectionName] = localStore[collectionName].filter((item) => item.id !== docId);
    }
    return true;
  }

  try {
    const { db, doc, deleteDoc } = await getFirestoreHelpers();
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`[Firestore] Error deleting ${collectionName}/${docId}:`, error);
    throw error;
  }
};

/* ── Membership Specific ── */

export const submitMembershipRequest = async (data) => {
  const request = {
    ...data,
    status: 'pending',
    submittedAt: new Date().toISOString(),
  };
  return addDocument('membershipRequests', request);
};

export const approveMembershipRequest = async (requestId, requestData) => {
  // Move to alumni collection
  await addDocument('alumni', {
    name: requestData.name,
    photo: requestData.photo || '',
    yearOfPassing: requestData.yearOfPassing,
    batch: requestData.batch,
    profession: requestData.profession,
    location: requestData.location || '',
    status: 'Active',
    bio: requestData.bio || '',
    email: requestData.email || '',
    phone: requestData.phone || '',
    approved: true,
    approvedAt: new Date().toISOString(),
  });

  // Update request status
  await updateDocument('membershipRequests', requestId, { status: 'approved' });
};

export const rejectMembershipRequest = async (requestId) => {
  await updateDocument('membershipRequests', requestId, { status: 'rejected' });
};

/* ── Contact Form ── */

export const submitContactForm = async (data) => {
  return addDocument('contactSubmissions', {
    ...data,
    submittedAt: new Date().toISOString(),
    read: false,
  });
};
