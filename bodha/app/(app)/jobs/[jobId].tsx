import { Redirect, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { EmptyState } from '@/components/common/empty-state';
import { InlineLinkButton } from '@/components/common/inline-link-button';
import { PrimaryButton } from '@/components/common/primary-button';
import { Screen } from '@/components/common/screen';
import { StatusCard } from '@/components/common/status-card';
import { ThemedText } from '@/components/themed-text';
import { JobDetailSection } from '@/components/jobs/job-detail-section';
import { ROUTES } from '@/constants/app';
import { useAsyncState } from '@/hooks/use-async-state';
import { useAuthGate } from '@/providers/auth-provider';
import { createJobApplication, hasUserAppliedToJob } from '@/services/firebase/applications';
import { getJobById } from '@/services/firebase/jobs';
import type { JobDocument } from '@/types/job';

export default function JobDetailScreen() {
  const params = useLocalSearchParams<{ jobId: string }>();
  const { authUser, profile, status } = useAuthGate();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const { data: job, error, loading, reload } = useAsyncState<JobDocument | null>(
    async () => {
      if (!params.jobId) {
        return null;
      }

      const jobData = await getJobById(params.jobId);

      if (authUser) {
        setAlreadyApplied(await hasUserAppliedToJob(authUser.uid, params.jobId));
      } else {
        setAlreadyApplied(false);
      }

      return jobData;
    },
    [authUser?.uid, params.jobId],
    null,
    'Unable to load this job.'
  );

  if (status !== 'ready') {
    return <Redirect href={ROUTES.login} />;
  }

  async function handleApply() {
    if (!authUser || !profile || !job || alreadyApplied) {
      return;
    }

    try {
      setSubmitting(true);
      await createJobApplication({
        userId: authUser.uid,
        userEmail: authUser.email,
        profile,
        job,
      });
      setAlreadyApplied(true);
      setMessage('Application submitted successfully.');
    } catch {
      setMessage('Could not submit application.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!loading && !job) {
    return (
      <Screen>
        <EmptyState title="Job not found" message={error ?? 'This role may have been removed.'} />
        {error ? <InlineLinkButton label="Retry job details" onPress={() => void reload()} /> : null}
      </Screen>
    );
  }

  return (
    <Screen>
      <StatusCard
        loading={loading}
        message={error ?? job?.companyName}
        title={job?.title ?? 'Job details'}
        footer={alreadyApplied ? 'You have already applied to this job.' : undefined}
      />
      {error ? <InlineLinkButton label="Retry job details" onPress={() => void reload()} /> : null}
      <JobDetailSection title="Location" value={job?.location ?? 'N/A'} />
      <JobDetailSection title="Experience required" value={job?.experienceRequired ?? 'N/A'} />
      <JobDetailSection title="Employment type" value={job?.employmentType ?? 'N/A'} />
      <JobDetailSection title="Salary range" value={job?.salaryRange ?? 'N/A'} />
      <ThemedText>{job?.description}</ThemedText>
      <ThemedText>{job?.skills.join(', ')}</ThemedText>
      {message ? <ThemedText>{message}</ThemedText> : null}
      <PrimaryButton
        disabled={loading || submitting || alreadyApplied}
        label={alreadyApplied ? 'Already applied' : 'Apply now'}
        onPress={handleApply}
      />
    </Screen>
  );
}