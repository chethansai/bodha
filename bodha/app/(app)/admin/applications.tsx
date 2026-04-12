import { Link } from 'expo-router';
import { EmptyState } from '@/components/common/empty-state';
import { InlineLinkButton } from '@/components/common/inline-link-button';
import { Screen } from '@/components/common/screen';
import { StatusCard } from '@/components/common/status-card';
import { useAsyncState } from '@/hooks/use-async-state';
import { listApplicationsGroupedByJob } from '@/services/firebase/applications';
import type { AdminJobApplicantsGroup } from '@/types/application';

export default function AdminApplicationsScreen() {
  const { data: groups, error, loading, reload } = useAsyncState<AdminJobApplicantsGroup[]>(
    () => listApplicationsGroupedByJob(),
    [],
    [],
    'Unable to load applications.'
  );

  return (
    <Screen>
      <StatusCard loading={loading} message={error ?? 'Applications grouped by job posting.'} title="Applications" />
      {error ? <InlineLinkButton label="Retry applications" onPress={() => void reload()} /> : null}
      {groups.map((group) => (
        <StatusCard
          key={group.jobId}
          message={`${group.companyName} • ${group.totalApplicants} applicants`}
          title={group.jobTitle}
        />
      ))}
      {!loading && !error && groups.length === 0 ? (
        <EmptyState
          title="No applications yet"
          message="Once users apply to jobs, they will be grouped here by job posting."
        />
      ) : null}
      {groups.map((group) => (
        <Link key={`${group.jobId}-link`} href={`/(app)/admin/jobs/${group.jobId}/applicants`}>
          Open applicants for {group.jobTitle}
        </Link>
      ))}
    </Screen>
  );
}