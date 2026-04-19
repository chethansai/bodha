import { Redirect, router } from 'expo-router';
import { useState } from 'react';

import { BrandHeader } from '@/components/common/brand-header';
import { Screen } from '@/components/common/screen';
import { ProfileForm } from '@/components/profile/profile-form';
import { ROUTES } from '@/constants/app';
import { validateProfile } from '@/helpers/validation';
import { useAuthGate } from '@/providers/auth-provider';
import { upsertUserProfile } from '@/services/firebase/profiles';

export default function CompleteProfileScreen() {
  const { authUser, status, refreshAuthState } = useAuthGate();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [education, setEducation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status === 'loggedOut') {
    return <Redirect href={ROUTES.login} />;
  }

  if (status === 'emailUnverified') {
    return <Redirect href={ROUTES.emailConfirmation} />;
  }

  if (status === 'ready') {
    return <Redirect href={ROUTES.jobs} />;
  }

  async function handleSubmit() {
    if (!authUser) {
      setError('You must be logged in to complete your profile.');
      return;
    }

    const input = {
      fullName,
      phoneNumber,
      yearsOfExperience: Number(yearsOfExperience),
      education,
    };

    const validationError = validateProfile(input);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await upsertUserProfile(authUser.uid, authUser.email, input, authUser.emailVerified);
      await refreshAuthState();
      router.replace(ROUTES.jobs);
    } catch {
      setError('Unable to save profile right now.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen>
      <BrandHeader
        subtitle="Complete your My Campus profile once so every application carries the right candidate snapshot."
        title="Finish your profile"
      />
      <ProfileForm
        disabled={submitting}
        education={education}
        error={error}
        fullName={fullName}
        onChangeEducation={setEducation}
        onChangeFullName={setFullName}
        onChangePhoneNumber={setPhoneNumber}
        onChangeYearsOfExperience={setYearsOfExperience}
        onSubmit={handleSubmit}
        phoneNumber={phoneNumber}
        yearsOfExperience={yearsOfExperience}
      />
    </Screen>
  );
}