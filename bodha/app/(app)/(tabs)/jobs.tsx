import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import { BrandHeader } from '@/components/common/brand-header';
import { JobCard } from '@/components/jobs/job-card';
import { Screen } from '@/components/common/screen';
import { StatusCard } from '@/components/common/status-card';
import { InlineLinkButton } from '@/components/common/inline-link-button';
import { EmptyState } from '@/components/common/empty-state';
import { formatFirebaseError } from '@/helpers/firebase-error';
import { mapJobDocumentToCard, listActiveJobs, seedDefaultJobsIfNeeded } from '@/services/firebase/jobs';
import type { JobDocument } from '@/types/job';

export default function JobsScreen() {
  const [jobs, setJobs] = useState<JobDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        await seedDefaultJobsIfNeeded();
        const data = await listActiveJobs();
        setJobs(data);
      } catch (loadError) {
        console.error(loadError);
        setError(formatFirebaseError(loadError, 'Unable to load jobs right now.'));
      } finally {
        setLoading(false);
      }
    }

    void loadJobs();
  }, []);

  return (
    <Screen>
      <BrandHeader
        subtitle="My Campus recommends active roles matched to your experience so you can apply without extra friction."
        title="Recommended jobs"
      />
      <StatusCard
        loading={loading}
        message={error ?? 'Browse active openings and apply with your saved profile.'}
        title="Recommended jobs"
      />
      {error ? <InlineLinkButton label="Retry jobs" onPress={() => void (async () => {
        setLoading(true);
        setError(null);

        try {
          await seedDefaultJobsIfNeeded();
          const data = await listActiveJobs();
          setJobs(data);
        } catch (loadError) {
          console.error(loadError);
          setError(formatFirebaseError(loadError, 'Unable to load jobs right now.'));
        } finally {
          setLoading(false);
        }
      })()} /> : null}
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={mapJobDocumentToCard(job)}
          onPress={() =>
            router.push({
              pathname: '/(app)/jobs/[jobId]',
              params: { jobId: job.id },
            })
          }
        />
      ))}
      {!loading && !error && jobs.length === 0 ? (
        <EmptyState
          title="No jobs available"
          message="The jobs collection is reachable, but no active jobs matched the current query."
        />
      ) : null}
    </Screen>
  );
}