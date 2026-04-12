import { Redirect } from 'expo-router';

import { ROUTES } from '@/constants/app';
import { useAuthGate } from '@/providers/auth-provider';

export default function IndexScreen() {
  const { status } = useAuthGate();

  if (status === 'loggedOut') {
    return <Redirect href={ROUTES.login} />;
  }

  if (status === 'emailUnverified') {
    return <Redirect href={ROUTES.emailConfirmation} />;
  }

  if (status === 'profileIncomplete') {
    return <Redirect href={ROUTES.completeProfile} />;
  }

  if (status === 'ready') {
    return <Redirect href={ROUTES.jobs} />;
  }

  return null;
}