import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { getFirebaseDb } from '@/services/firebase/app';
import type { CompleteProfileInput, UpdateProfileInput, UserProfileDocument } from '@/types/profile';

const USERS_COLLECTION = 'users';

function getUserDocRef(uid: string) {
  return doc(getFirebaseDb(), USERS_COLLECTION, uid);
}

export async function getUserProfile(uid: string): Promise<UserProfileDocument | null> {
  const snapshot = await getDoc(getUserDocRef(uid));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as UserProfileDocument;
}

export async function upsertUserProfile(
  uid: string,
  email: string,
  input: CompleteProfileInput,
  emailVerified: boolean
): Promise<UserProfileDocument> {
  const nextProfile: Omit<UserProfileDocument, 'createdAt' | 'updatedAt' | 'lastLoginAt'> = {
    uid,
    email,
    fullName: input.fullName.trim(),
    phoneNumber: input.phoneNumber.trim(),
    yearsOfExperience: input.yearsOfExperience,
    education: input.education.trim(),
    emailVerified,
    isProfileComplete: true,
  };

  await setDoc(
    getUserDocRef(uid),
    {
      ...nextProfile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    },
    { merge: true }
  );

  const createdProfile = await getUserProfile(uid);

  if (!createdProfile) {
    throw new Error('Profile could not be created.');
  }

  return createdProfile;
}

export async function updateUserProfile(uid: string, input: UpdateProfileInput): Promise<void> {
  await updateDoc(getUserDocRef(uid), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function markUserLogin(uid: string): Promise<void> {
  const ref = getUserDocRef(uid);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return;
  }

  await updateDoc(ref, {
    lastLoginAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function listAllUsers(): Promise<UserProfileDocument[]> {
  const usersQuery = query(collection(getFirebaseDb(), USERS_COLLECTION), orderBy('createdAt', 'desc'));
  const snapshots = await getDocs(usersQuery);
  return snapshots.docs.map((item) => item.data() as UserProfileDocument);
}

export function isProfileComplete(profile: UserProfileDocument | null): boolean {
  if (!profile) {
    return false;
  }

  return Boolean(
    profile.fullName?.trim() &&
      profile.phoneNumber?.trim() &&
      profile.education?.trim() &&
      Number.isFinite(profile.yearsOfExperience)
  );
}