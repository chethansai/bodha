import type { JobDocument } from '@/types/job';
import type { UserProfileDocument } from '@/types/profile';
import type { FirestoreTimestampLike } from '@/types/firestore';

export type ApplicationStatus = 'applied';

export interface JobApplicationDocument {
  id: string;
  userId: string;
  userEmail: string;
  fullName: string;
  phoneNumber: string;
  yearsOfExperience: number;
  education: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  jobLocation: string;
  applicationStatus: ApplicationStatus;
  appliedAt: FirestoreTimestampLike;
}

export interface CreateApplicationInput {
  userId: string;
  userEmail: string;
  profile: Pick<UserProfileDocument, 'fullName' | 'phoneNumber' | 'yearsOfExperience' | 'education'>;
  job: Pick<JobDocument, 'id' | 'title' | 'companyName' | 'location'>;
}

export interface AdminJobApplicantsGroup {
  jobId: string;
  jobTitle: string;
  companyName: string;
  applicants: JobApplicationDocument[];
  totalApplicants: number;
}