import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import type { User } from 'firebase/auth';

import { ADMIN_EMAIL } from '@/constants/app';
import { signOutCurrentUser, subscribeToAuthChanges, reloadCurrentUser } from '@/services/firebase/auth';
import { getUserProfile, isProfileComplete, markUserLogin } from '@/services/firebase/profiles';
import type { AuthGateContextValue, AuthSessionUser, AuthGateStatus } from '@/types/auth';
import type { UserProfileDocument } from '@/types/profile';

const AuthContext = createContext<AuthGateContextValue | undefined>(undefined);

function toSessionUser(user: User): AuthSessionUser {
  return {
    uid: user.uid,
    email: user.email ?? '',
    emailVerified: user.emailVerified,
  };
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<AuthGateStatus>('loading');
  const [authUser, setAuthUser] = useState<AuthSessionUser | null>(null);
  const [profile, setProfile] = useState<UserProfileDocument | null>(null);

  async function resolveUserState(user: User | null) {
    if (!user || !user.email) {
      setAuthUser(null);
      setProfile(null);
      setStatus('loggedOut');
      return;
    }

    const refreshed = await reloadCurrentUser();
    const currentUser = refreshed ?? user;
    const sessionUser = toSessionUser(currentUser);

    setAuthUser(sessionUser);

    if (!sessionUser.emailVerified) {
      setProfile(null);
      setStatus('emailUnverified');
      return;
    }

    const userProfile = await getUserProfile(sessionUser.uid);
    setProfile(userProfile);

    if (!isProfileComplete(userProfile)) {
      setStatus('profileIncomplete');
      return;
    }

    await markUserLogin(sessionUser.uid);
    setStatus('ready');
  }

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setStatus('loading');
      void resolveUserState(user);
    });

    return unsubscribe;
  }, []);

  async function refreshAuthState() {
    setStatus('loading');
    await resolveUserState(await reloadCurrentUser());
  }

  async function signOutUser() {
    await signOutCurrentUser();
  }

  const value: AuthGateContextValue = {
    status,
    authUser,
    profile,
    isAdmin: authUser?.email.toLowerCase() === ADMIN_EMAIL.toLowerCase(),
    refreshAuthState,
    signOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthGate() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthGate must be used within AuthProvider.');
  }

  return context;
}