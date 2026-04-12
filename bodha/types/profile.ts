import type { FirestoreTimestampLike } from '@/types/firestore';

export interface UserProfileDocument {
  uid: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  yearsOfExperience: number;
  education: string;
  emailVerified: boolean;
  isProfileComplete: boolean;
  createdAt: FirestoreTimestampLike;
  updatedAt: FirestoreTimestampLike;
  lastLoginAt: FirestoreTimestampLike;
}

export interface CompleteProfileInput {
  fullName: string;
  phoneNumber: string;
  yearsOfExperience: number;
  education: string;
}

export interface UpdateProfileInput {
  fullName?: string;
  phoneNumber?: string;
  yearsOfExperience?: number;
  education?: string;
  emailVerified?: boolean;
  isProfileComplete?: boolean;
  lastLoginAt?: FirestoreTimestampLike;
}