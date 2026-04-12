import { Redirect } from 'expo-router';
import { useState } from 'react';

import { PrimaryButton } from '@/components/common/primary-button';
import { Screen } from '@/components/common/screen';
import { StatusCard } from '@/components/common/status-card';
import { ThemedText } from '@/components/themed-text';
import { ROUTES } from '@/constants/app';
import { useAuthGate } from '@/providers/auth-provider';
import { mapFirebaseAuthError, sendVerificationEmailToCurrentUser } from '@/services/firebase/auth';

export default function EmailConfirmationScreen() {
  const { status, authUser, refreshAuthState, signOutUser } = useAuthGate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>('Verify your email before continuing.');

  if (status === 'ready') {
    return <Redirect href={ROUTES.jobs} />;
  }

  if (status === 'loggedOut') {
    return <Redirect href={ROUTES.login} />;
  }

  async function handleRefresh() {
    try {
      setLoading(true);
      await refreshAuthState();
    } catch {
      setMessage('Could not refresh verification status. Try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    try {
      setLoading(true);
      await sendVerificationEmailToCurrentUser();
      setMessage('Verification email sent again.');
    } catch (error) {
      setMessage(mapFirebaseAuthError(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <StatusCard
        loading={loading}
        message={message}
        title={`Confirm ${authUser?.email ?? 'your email'}`}
      />
      <PrimaryButton disabled={loading} label="I have verified my email" onPress={handleRefresh} />
      <PrimaryButton disabled={loading} label="Resend verification email" onPress={handleResend} />
      <PrimaryButton disabled={loading} label="Sign out" onPress={() => void signOutUser()} />
      <ThemedText>
        If you verified outside the app, use refresh to pull the latest account state.
      </ThemedText>
    </Screen>
  );
}