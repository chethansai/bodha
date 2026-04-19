import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';

import { toTimestampMillis } from '@/helpers/formatters';
import { getFirebaseDb } from '@/services/firebase/app';
import type {
  AdminJobApplicantsGroup,
  CreateApplicationInput,
  JobApplicationDocument,
} from '@/types/application';

const APPLICATIONS_COLLECTION = 'applications';

export function getApplicationDocumentId(userId: string, jobId: string): string {
  return `${userId}_${jobId}`;
}

export async function hasUserAppliedToJob(userId: string, jobId: string): Promise<boolean> {
  const snapshot = await getDoc(doc(getFirebaseDb(), APPLICATIONS_COLLECTION, getApplicationDocumentId(userId, jobId)));
  return snapshot.exists();
}

export async function createJobApplication(input: CreateApplicationInput): Promise<JobApplicationDocument> {
  const applicationId = getApplicationDocumentId(input.userId, input.job.id);
  const ref = doc(getFirebaseDb(), APPLICATIONS_COLLECTION, applicationId);

  await setDoc(
    ref,
    {
      userId: input.userId,
      userEmail: input.userEmail,
      fullName: input.profile.fullName,
      phoneNumber: input.profile.phoneNumber,
      yearsOfExperience: input.profile.yearsOfExperience,
      education: input.profile.education,
      jobId: input.job.id,
      jobTitle: input.job.title,
      companyName: input.job.companyName,
      jobLocation: input.job.location,
      applicationStatus: 'applied',
      appliedAt: serverTimestamp(),
    },
    { merge: false }
  );

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    throw new Error('Application could not be created.');
  }

  return { id: snapshot.id, ...(snapshot.data() as Omit<JobApplicationDocument, 'id'>) };
}

export async function listApplicationsForUser(userId: string): Promise<JobApplicationDocument[]> {
  const applicationsQuery = query(collection(getFirebaseDb(), APPLICATIONS_COLLECTION), where('userId', '==', userId));
  const snapshots = await getDocs(applicationsQuery);

  return snapshots.docs
    .map((item) => ({ id: item.id, ...(item.data() as Omit<JobApplicationDocument, 'id'>) }))
    .sort((left, right) => toTimestampMillis(right.appliedAt) - toTimestampMillis(left.appliedAt));
}

export async function listAllApplications(): Promise<JobApplicationDocument[]> {
  const snapshots = await getDocs(collection(getFirebaseDb(), APPLICATIONS_COLLECTION));

  return snapshots.docs
    .map((item) => ({ id: item.id, ...(item.data() as Omit<JobApplicationDocument, 'id'>) }))
    .sort((left, right) => toTimestampMillis(right.appliedAt) - toTimestampMillis(left.appliedAt));
}

export async function listApplicantsForJob(jobId: string): Promise<JobApplicationDocument[]> {
  const applicationsQuery = query(collection(getFirebaseDb(), APPLICATIONS_COLLECTION), where('jobId', '==', jobId));
  const snapshots = await getDocs(applicationsQuery);

  return snapshots.docs
    .map((item) => ({ id: item.id, ...(item.data() as Omit<JobApplicationDocument, 'id'>) }))
    .sort((left, right) => toTimestampMillis(right.appliedAt) - toTimestampMillis(left.appliedAt));
}

export async function listApplicationsGroupedByJob(): Promise<AdminJobApplicantsGroup[]> {
  const applications = await listAllApplications();
  const groups = new Map<string, AdminJobApplicantsGroup>();

  for (const application of applications) {
    const existing = groups.get(application.jobId);

    if (existing) {
      existing.applicants.push(application);
      existing.totalApplicants = existing.applicants.length;
      continue;
    }

    groups.set(application.jobId, {
      jobId: application.jobId,
      jobTitle: application.jobTitle,
      companyName: application.companyName,
      applicants: [application],
      totalApplicants: 1,
    });
  }

  return [...groups.values()];
}