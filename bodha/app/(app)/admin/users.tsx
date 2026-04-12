import { UserRow } from '@/components/admin/user-row';
import { EmptyState } from '@/components/common/empty-state';
import { InlineLinkButton } from '@/components/common/inline-link-button';
import { Screen } from '@/components/common/screen';
import { StatusCard } from '@/components/common/status-card';
import { useAsyncState } from '@/hooks/use-async-state';
import { listAllUsers } from '@/services/firebase/profiles';

export default function AdminUsersScreen() {
  const { data: users, error, loading, reload } = useAsyncState(
    () => listAllUsers(),
    [],
    [],
    'Unable to load users.'
  );

  return (
    <Screen>
      <StatusCard loading={loading} message={error ?? 'All registered users in the system.'} title="Users" />
      {error ? <InlineLinkButton label="Retry users" onPress={() => void reload()} /> : null}
      {users.map((user) => (
        <UserRow key={user.uid} user={user} />
      ))}
      {!loading && !error && users.length === 0 ? (
        <EmptyState title="No users found" message="Profiles will appear here after users complete onboarding." />
      ) : null}
    </Screen>
  );
}