import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';

import { getFirebaseApp } from '@/services/firebase/app';

export async function getFirebaseAnalyticsSafe(): Promise<Analytics | null> {
  if (!(await isSupported())) {
    return null;
  }

  return getAnalytics(getFirebaseApp());
}