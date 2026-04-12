import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  type Unsubscribe,
  type User,
  type UserCredential,
} from 'firebase/auth';

import { getFirebaseAuth } from '@/services/firebase/app';
import type { LoginFormValues, SignupFormValues } from '@/types/auth';

export async function signUpWithEmail(values: SignupFormValues): Promise<UserCredential> {
  return createUserWithEmailAndPassword(getFirebaseAuth(), values.email.trim(), values.password);
}

export async function signInWithEmail(values: LoginFormValues): Promise<UserCredential> {
  return signInWithEmailAndPassword(getFirebaseAuth(), values.email.trim(), values.password);
}

export async function sendVerificationEmailToCurrentUser(): Promise<void> {
  const user = getFirebaseAuth().currentUser;

  if (!user) {
    throw new Error('No authenticated user found.');
  }

  await sendEmailVerification(user);
}

export async function reloadCurrentUser(): Promise<User | null> {
  const user = getFirebaseAuth().currentUser;

  if (!user) {
    return null;
  }

  await reload(user);
  return getFirebaseAuth().currentUser;
}

export async function signOutCurrentUser(): Promise<void> {
  await signOut(getFirebaseAuth());
}

export function subscribeToAuthChanges(callback: (user: User | null) => Promise<void> | void): Unsubscribe {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}

export function mapFirebaseAuthError(error: unknown): string {
  if (!(error instanceof Error)) {
    return 'Something went wrong. Please try again.';
  }

  const message = error.message;

  if (message.includes('auth/email-already-in-use')) {
    return 'This email is already in use.';
  }

  if (message.includes('auth/invalid-credential')) {
    return 'Invalid email or password.';
  }

  if (message.includes('auth/too-many-requests')) {
    return 'Too many attempts. Try again later.';
  }

  return 'Unable to complete authentication. Please try again.';
}