import { Link, Redirect } from 'expo-router';
import { useState } from 'react';

import { AuthForm } from '@/components/auth/auth-form';
import { Screen } from '@/components/common/screen';
import { ThemedText } from '@/components/themed-text';
import { ROUTES } from '@/constants/app';
import { validateLogin } from '@/helpers/validation';
import { useAuthGate } from '@/providers/auth-provider';
import { mapFirebaseAuthError, signInWithEmail } from '@/services/firebase/auth';

export default function LoginScreen() {
  const { status } = useAuthGate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    const validationError = validateLogin({ email, password });

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await signInWithEmail({ email, password });
    } catch (submitError) {
      setError(mapFirebaseAuthError(submitError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen>
      <AuthForm
        disabled={submitting}
        email={email}
        error={error}
        onChangeEmail={setEmail}
        onChangePassword={setPassword}
        onSubmit={handleSubmit}
        password={password}
        submitLabel="Login"
        subtitle="My Campus helps you discover verified roles, manage applications, and stay interview-ready."
        title="Welcome back"
      />
      <ThemedText>
        New to My Campus? <Link href={ROUTES.signup}>Create an account</Link>
      </ThemedText>
    </Screen>
  );
}