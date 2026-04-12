import type { UserProfileDocument } from '@/types/profile';

export type AuthGateStatus = 'loading' | 'loggedOut' | 'emailUnverified' | 'profileIncomplete' | 'ready';

export interface AuthSessionUser {
  uid: string;
  email: string;
  emailVerified: boolean;
}

export interface AuthGateContextValue {
  status: AuthGateStatus;
  authUser: AuthSessionUser | null;
  profile: UserProfileDocument | null;
  isAdmin: boolean;
  refreshAuthState: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}