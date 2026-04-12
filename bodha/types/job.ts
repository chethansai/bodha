import type { FirestoreTimestampLike } from '@/types/firestore';

export interface JobDocument {
  id: string;
  title: string;
  companyName: string;
  location: string;
  experienceRequired: string;
  description: string;
  employmentType: string;
  salaryRange: string;
  skills: string[];
  isActive: boolean;
  postedAt: FirestoreTimestampLike;
  updatedAt: FirestoreTimestampLike;
  slug: string;
  seedKey: string;
}

export interface JobCardModel {
  id: string;
  title: string;
  companyName: string;
  location: string;
  experienceRequired: string;
  isActive: boolean;
}

export interface SeedJobInput {
  title: string;
  companyName: string;
  location: string;
  experienceRequired: string;
  description: string;
  employmentType: string;
  salaryRange: string;
  skills: string[];
  slug: string;
  seedKey: string;
}