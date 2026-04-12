import type { FirestoreTimestampLike } from '@/types/firestore';

export function formatDate(value: FirestoreTimestampLike): string {
  if (!value) {
    return 'N/A';
  }

  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  if ('toDate' in value) {
    return value.toDate().toLocaleDateString();
  }

  return 'N/A';
}