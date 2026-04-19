import { Link, Redirect, router } from 'expo-router';
import { useState } from 'react';

import { AuthForm } from '@/components/auth/auth-form';
import { Screen } from '@/components/common/screen';
import { ThemedText } from '@/components/themed-text';
import { ROUTES } from '@/constants/app';
import { validateSignup } from '@/helpers/validation';
import { useAuthGate } from '@/providers/auth-provider';
import {
  mapFirebaseAuthError,
  sendVerificationEmailToCurrentUser,
  signUpWithEmail,
} from '@/services/firebase/auth';

export default function SignupScreen() {
  const { status } = useAuthGate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status === 'ready') {
    return <Redirect href={ROUTES.jobs} />;
  }

  if (status === 'emailUnverified') {
    return <Redirect href={ROUTES.emailConfirmation} />;
  }

  if (status === 'profileIncomplete') {
    return <Redirect href={ROUTES.completeProfile} />;
  }

  async function handleSubmit() {
    const validationError = validateSignup({ email, password, confirmPassword });

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await signUpWithEmail({ email, password, confirmPassword });
      await sendVerificationEmailToCurrentUser();
      router.replace(ROUTES.emailConfirmation);
    } catch (submitError) {
      setError(mapFirebaseAuthError(submitError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen>
      <AuthForm
        confirmPassword={confirmPassword}
        disabled={submitting}
        email={email}
        error={error}
        onChangeConfirmPassword={setConfirmPassword}
        onChangeEmail={setEmail}
        onChangePassword={setPassword}
        onSubmit={handleSubmit}
        password={password}
        submitLabel="Create account"
        subtitle="Create your My Campus profile to apply faster and unlock a curated job dashboard."
        title="Create your account"
      />
      <ThemedText>
        Already on My Campus? <Link href={ROUTES.login}>Log in</Link>
      </ThemedText>
    </Screen>
  );
}