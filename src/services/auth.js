/* Authentication service — wraps Firebase Auth.
   Returns null/defaults when Firebase is not configured. */

import { isFirebaseConfigured } from './firebase';

export const signInAdmin = async (email, password) => {
  if (!isFirebaseConfigured()) {
    // Demo mode: accept any credentials
    console.info('[Auth] Demo mode — simulating login');
    return {
      uid: 'demo-admin',
      email: email || 'admin@hcsalumni.org',
      displayName: 'Demo Admin',
    };
  }

  const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
  const auth = getAuth();
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const signOutAdmin = async () => {
  if (!isFirebaseConfigured()) {
    console.info('[Auth] Demo mode — simulating logout');
    return;
  }

  const { getAuth, signOut } = await import('firebase/auth');
  const auth = getAuth();
  await signOut(auth);
};

export const onAuthChange = (callback) => {
  if (!isFirebaseConfigured()) {
    // No auth in demo mode
    callback(null);
    return () => {};
  }

  const loadAuth = async () => {
    const { getAuth, onAuthStateChanged } = await import('firebase/auth');
    const auth = getAuth();
    return onAuthStateChanged(auth, callback);
  };

  let unsubscribe = () => {};
  loadAuth().then((unsub) => {
    unsubscribe = unsub;
  });

  return () => unsubscribe();
};
