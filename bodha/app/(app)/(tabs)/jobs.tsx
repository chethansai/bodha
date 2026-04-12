import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import { JobCard } from '@/components/jobs/job-card';
import { Screen } from '@/components/common/screen';
import { StatusCard } from '@/components/common/status-card';
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
      } catch {
        setError('Unable to load jobs right now.');
      } finally {
        setLoading(false);
      }
    }

    void loadJobs();
  }, []);

  return (
    <Screen>
      <StatusCard
        loading={loading}
        message={error ?? 'Browse active openings and apply with your saved profile.'}
        title="Recommended jobs"
      />
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
    </Screen>
  );
}