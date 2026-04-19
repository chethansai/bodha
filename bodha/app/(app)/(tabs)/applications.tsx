import { BrandHeader } from '@/components/common/brand-header';
import { EmptyState } from '@/components/common/empty-state';
import { InlineLinkButton } from '@/components/common/inline-link-button';
import { Screen } from '@/components/common/screen';
import { StatusCard } from '@/components/common/status-card';
import { formatDate } from '@/helpers/formatters';
import { useAsyncState } from '@/hooks/use-async-state';
import { useAuthGate } from '@/providers/auth-provider';
import { listApplicationsForUser } from '@/services/firebase/applications';

export default function ApplicationsScreen() {
  const { authUser } = useAuthGate();
  const { data: applications, loading, error, reload } = useAsyncState(
    async () => {
      if (!authUser) {
        return [];
      }

      return listApplicationsForUser(authUser.uid);
    },
    [authUser?.uid],
    [],
    'Unable to load your applications.'
  );

  return (
    <Screen>
      <BrandHeader
        subtitle="Track every My Campus application in one place, from first click to final shortlist."
        title="My applications"
      />
      <StatusCard
        loading={loading}
        message={error ?? 'Track every job you have applied to.'}
        title="My applications"
      />
      {error ? <InlineLinkButton label="Retry" onPress={() => void reload()} /> : null}
      {applications.map((application) => (
        <StatusCard
          key={application.id}
          message={`${application.companyName} • Applied on ${formatDate(application.appliedAt)}`}
          title={application.jobTitle}
          footer={`${application.applicationStatus.toUpperCase()} • ${application.jobLocation}`}
        />
      ))}
      {!loading && !error && applications.length === 0 ? (
        <EmptyState
          title="No applications yet"
          message="When you apply for a job, it will show up here with the company and date."
        />
      ) : null}
    </Screen>
  );
}