import { Link } from 'expo-router';

import { BrandHeader } from '@/components/common/brand-header';
import { PrimaryButton } from '@/components/common/primary-button';
import { Screen } from '@/components/common/screen';
import { StatusCard } from '@/components/common/status-card';
import { ROUTES } from '@/constants/app';
import { useAuthGate } from '@/providers/auth-provider';

export default function ProfileScreen() {
  const { authUser, profile, isAdmin, signOutUser } = useAuthGate();

  return (
    <Screen>
      <BrandHeader
        subtitle="Your My Campus profile powers faster applications and gives recruiters a complete candidate snapshot."
        title="Profile"
      />
      <StatusCard title={profile?.fullName ?? 'Profile'} message={authUser?.email} />
      <StatusCard title="Phone" message={profile?.phoneNumber ?? 'Not added'} />
      <StatusCard title="Experience" message={`${profile?.yearsOfExperience ?? 0} years`} />
      <StatusCard title="Education" message={profile?.education ?? 'Not added'} />
      {isAdmin ? <Link href={ROUTES.admin}>Open My Campus admin panel</Link> : null}
      <PrimaryButton label="Sign out" onPress={() => void signOutUser()} />
    </Screen>
  );
}