import { Link } from 'expo-router';
import { View, StyleSheet } from 'react-native';

import { AdminStatCard } from '@/components/admin/admin-stat-card';
import { EmptyState } from '@/components/common/empty-state';
import { InlineLinkButton } from '@/components/common/inline-link-button';
import { Screen } from '@/components/common/screen';
import { StatusCard } from '@/components/common/status-card';
import { useAsyncState } from '@/hooks/use-async-state';
import { listAllApplications } from '@/services/firebase/applications';
import { listAllUsers } from '@/services/firebase/profiles';

export default function AdminDashboardScreen() {
  const { data, error, loading, reload } = useAsyncState(
    async () => {
      const [users, applications] = await Promise.all([listAllUsers(), listAllApplications()]);
      return { userCount: users.length, applicationCount: applications.length };
    },
    [],
    { userCount: 0, applicationCount: 0 },
    'Unable to load admin metrics.'
  );

  return (
    <Screen>
      <StatusCard
        loading={loading}
        message={error ?? 'Review registered users and all submitted job applications.'}
        title="Admin dashboard"
      />
      {error ? <InlineLinkButton label="Retry dashboard" onPress={() => void reload()} /> : null}
      <View style={styles.row}>
        <AdminStatCard label="Registered users" value={data.userCount} />
        <AdminStatCard label="Applications" value={data.applicationCount} />
      </View>
      {!loading && !error && data.userCount === 0 && data.applicationCount === 0 ? (
        <EmptyState
          title="No admin data yet"
          message="Users and applications will appear here once people start signing up and applying."
        />
      ) : null}
      <Link href="/(app)/admin/users">View all users</Link>
      <Link href="/(app)/admin/applications">View all applications</Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
});