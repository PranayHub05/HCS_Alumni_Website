/* Firebase service stubs — will be configured when Firebase project is ready.
   For now, all services return defaults from local data. */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

// Firebase will be initialized when config is provided
let app = null;
let auth = null;
let db = null;
let storage = null;

const isFirebaseConfigured = () => {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
};

const initializeFirebase = async () => {
  if (!isFirebaseConfigured()) {
    console.info('[Firebase] Not configured — using local defaults.');
    return { app: null, auth: null, db: null, storage: null };
  }

  try {
    const { initializeApp } = await import('firebase/app');
    const { getAuth } = await import('firebase/auth');
    const { getFirestore } = await import('firebase/firestore');
    const { getStorage } = await import('firebase/storage');

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    console.info('[Firebase] Initialized successfully.');
    return { app, auth, db, storage };
  } catch (error) {
    console.error('[Firebase] Initialization failed:', error);
    return { app: null, auth: null, db: null, storage: null };
  }
};

export { app, auth, db, storage, isFirebaseConfigured, initializeFirebase };
export default firebaseConfig;
