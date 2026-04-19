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

export function toTimestampMillis(value: FirestoreTimestampLike): number {
  if (!value) {
    return 0;
  }

  if (value instanceof Date) {
    return value.getTime();
  }

  if ('toDate' in value) {
    return value.toDate().getTime();
  }

  return 0;
}