import { useLocalSearchParams } from 'expo-router';

import { ApplicationRow } from '@/components/admin/application-row';
import { EmptyState } from '@/components/common/empty-state';
import { InlineLinkButton } from '@/components/common/inline-link-button';
import { Screen } from '@/components/common/screen';
import { StatusCard } from '@/components/common/status-card';
import { useAsyncState } from '@/hooks/use-async-state';
import { listApplicantsForJob } from '@/services/firebase/applications';

export default function JobApplicantsScreen() {
  const params = useLocalSearchParams<{ jobId: string }>();
  const { data: applications, error, loading, reload } = useAsyncState(
    async () => {
      if (!params.jobId) {
        return [];
      }

      return listApplicantsForJob(params.jobId);
    },
    [params.jobId],
    [],
    'Unable to load applicants for this job.'
  );

  return (
    <Screen>
      <StatusCard loading={loading} message={error ?? 'Applicants for the selected job.'} title="Applicants" />
      {error ? <InlineLinkButton label="Retry applicants" onPress={() => void reload()} /> : null}
      {applications.map((application) => (
        <ApplicationRow key={application.id} application={application} />
      ))}
      {!loading && !error && applications.length === 0 ? (
        <EmptyState title="No applicants yet" message="This job has not received any applications yet." />
      ) : null}
    </Screen>
  );
}