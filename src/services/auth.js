/* Authentication service — wraps Firebase Auth.
   Returns null/defaults when Firebase is not configured. */

import { isFirebaseConfigured } from './firebase';

export const signInAdmin = async (email, password) => {
  if (!isFirebaseConfigured()) {
    const trimmedEmail = (email || '').trim().toLowerCase();
    const isValidUser = trimmedEmail === 'admin' || trimmedEmail === 'admin@hcsalumni.org' || trimmedEmail === 'admin@hcs.com';
    const isValidPass = (password || '') === 'admin@HCSAA';

    if (isValidUser && isValidPass) {
      console.info('[Auth] Admin authentication successful');
      return {
        uid: 'admin-hcs',
        email: email,
        displayName: 'HCS Admin',
      };
    } else {
      throw new Error('Invalid email or password. Please try again.');
    }
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
