import { Redirect, Stack } from 'expo-router';

import { ROUTES } from '@/constants/app';
import { useAuthGate } from '@/providers/auth-provider';

export default function AdminLayout() {
  const { isAdmin, status } = useAuthGate();

  if (status !== 'ready') {
    return <Redirect href={ROUTES.login} />;
  }

  if (!isAdmin) {
    return <Redirect href={ROUTES.jobs} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}