import { Redirect, Stack } from 'expo-router';

import { ROUTES } from '@/constants/app';
import { useAuthGate } from '@/providers/auth-provider';

export default function AppLayout() {
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

  return <Stack screenOptions={{ headerShown: false }} />;
}