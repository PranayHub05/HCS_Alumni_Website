/* Storage service — wraps Firebase Storage for file uploads.
   Falls back to local data URLs when Firebase is not configured. */

import { isFirebaseConfigured } from './firebase';

export const uploadFile = async (path, file) => {
  if (!isFirebaseConfigured()) {
    // Return local object URL in demo mode
    return URL.createObjectURL(file);
  }

  try {
    const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
    const storage = getStorage();
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error('[Storage] Upload failed:', error);
    throw error;
  }
};

export const deleteFile = async (path) => {
  if (!isFirebaseConfigured()) {
    return true;
  }

  try {
    const { getStorage, ref, deleteObject } = await import('firebase/storage');
    const storage = getStorage();
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error('[Storage] Delete failed:', error);
    throw error;
  }
};
