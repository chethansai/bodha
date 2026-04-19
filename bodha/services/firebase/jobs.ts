import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';

import { DEFAULT_JOBS } from '@/constants/app';
import { toTimestampMillis } from '@/helpers/formatters';
import { getFirebaseDb } from '@/services/firebase/app';
import type { JobCardModel, JobDocument } from '@/types/job';

const JOBS_COLLECTION = 'jobs';

export async function seedDefaultJobsIfNeeded(): Promise<{ insertedCount: number; skippedCount: number }> {
  let insertedCount = 0;
  let skippedCount = 0;

  for (const job of DEFAULT_JOBS) {
    const existingQuery = query(
      collection(getFirebaseDb(), JOBS_COLLECTION),
      where('seedKey', '==', job.seedKey)
    );
    const existing = await getDocs(existingQuery);

    if (!existing.empty) {
      skippedCount += 1;
      continue;
    }

    await addDoc(collection(getFirebaseDb(), JOBS_COLLECTION), {
      ...job,
      isActive: true,
      postedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    insertedCount += 1;
  }

  return { insertedCount, skippedCount };
}

export async function listActiveJobs(): Promise<JobDocument[]> {
  const jobsQuery = query(collection(getFirebaseDb(), JOBS_COLLECTION), where('isActive', '==', true));
  const snapshots = await getDocs(jobsQuery);

  return snapshots.docs
    .map((item) => ({ id: item.id, ...(item.data() as Omit<JobDocument, 'id'>) }))
    .sort((left, right) => toTimestampMillis(right.postedAt) - toTimestampMillis(left.postedAt));
}

export async function getJobById(jobId: string): Promise<JobDocument | null> {
  const snapshot = await getDoc(doc(getFirebaseDb(), JOBS_COLLECTION, jobId));

  if (!snapshot.exists()) {
    return null;
  }

  return { id: snapshot.id, ...(snapshot.data() as Omit<JobDocument, 'id'>) };
}

export async function listAllJobsForAdmin(): Promise<JobDocument[]> {
  const snapshots = await getDocs(collection(getFirebaseDb(), JOBS_COLLECTION));

  return snapshots.docs
    .map((item) => ({ id: item.id, ...(item.data() as Omit<JobDocument, 'id'>) }))
    .sort((left, right) => toTimestampMillis(right.postedAt) - toTimestampMillis(left.postedAt));
}

export function mapJobDocumentToCard(job: JobDocument): JobCardModel {
  return {
    id: job.id,
    title: job.title,
    companyName: job.companyName,
    location: job.location,
    experienceRequired: job.experienceRequired,
    isActive: job.isActive,
  };
}