import { StatusCard } from '@/components/common/status-card';
import type { UserProfileDocument } from '@/types/profile';

interface UserRowProps {
  user: UserProfileDocument;
}

export function UserRow({ user }: UserRowProps) {
  return (
    <StatusCard
      title={user.fullName || user.email}
      message={`${user.email} • ${user.phoneNumber || 'No phone'} • ${user.education || 'No education'}`}
      footer={`${user.yearsOfExperience ?? 0} years experience`}
    />
  );
}
