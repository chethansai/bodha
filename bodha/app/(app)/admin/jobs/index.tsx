import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BrandHeader } from '@/components/common/brand-header';
import { EmptyState } from '@/components/common/empty-state';
import { InlineLinkButton } from '@/components/common/inline-link-button';
import { PrimaryButton } from '@/components/common/primary-button';
import { Screen } from '@/components/common/screen';
import { StatusCard } from '@/components/common/status-card';
import { TextField } from '@/components/common/text-field';
import { ThemedText } from '@/components/themed-text';
import { useAsyncState } from '@/hooks/use-async-state';
import { validateJob } from '@/helpers/validation';
import { createJob, deleteJob, listAllJobsForAdmin } from '@/services/firebase/jobs';
import type { CreateJobInput, JobDocument } from '@/types/job';

const initialFormState: CreateJobInput = {
  title: '',
  companyName: '',
  location: '',
  experienceRequired: '',
  description: '',
  employmentType: '',
  salaryRange: '',
  skills: [],
  slug: '',
};

export default function AdminJobsScreen() {
  const [form, setForm] = useState<CreateJobInput>(initialFormState);
  const [skillsInput, setSkillsInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const { data: jobs, error, loading, reload } = useAsyncState<JobDocument[]>(
    () => listAllJobsForAdmin(),
    [],
    [],
    'Unable to load jobs.'
  );

  function updateField<K extends keyof CreateJobInput>(field: K, value: CreateJobInput[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setForm(initialFormState);
    setSkillsInput('');
  }

  async function handleCreateJob() {
    const preparedJob: CreateJobInput = {
      ...form,
      skills: skillsInput
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
      slug: form.slug.trim().toLowerCase(),
    };
    const validationError = validateJob(preparedJob);

    if (validationError) {
      setActionError(validationError);
      setActionMessage(null);
      return;
    }

    try {
      setSubmitting(true);
      setActionError(null);
      await createJob(preparedJob);
      setActionMessage('Job created successfully.');
      resetForm();
      await reload();
    } catch {
      setActionError('Unable to create the job right now.');
      setActionMessage(null);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteJob(jobId: string) {
    try {
      setSubmitting(true);
      setActionError(null);
      await deleteJob(jobId);
      setActionMessage('Job deleted successfully.');
      await reload();
    } catch {
      setActionError('Unable to delete the job right now.');
      setActionMessage(null);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen>
      <BrandHeader
        eyebrow="MY CAMPUS ADMIN"
        subtitle="Create, review, and remove job listings from the hiring dashboard."
        title="Jobs management"
      />
      <StatusCard
        loading={loading || submitting}
        message={error ?? actionError ?? actionMessage ?? 'Create a new job listing and manage existing postings.'}
        title="Manage jobs"
      />
      {error ? <InlineLinkButton label="Retry jobs" onPress={() => void reload()} /> : null}
      <View style={styles.formSection}>
        <TextField label="Job title" value={form.title} onChangeText={(value) => updateField('title', value)} />
        <TextField label="Company name" value={form.companyName} onChangeText={(value) => updateField('companyName', value)} />
        <TextField label="Location" value={form.location} onChangeText={(value) => updateField('location', value)} />
        <TextField
          label="Experience required"
          value={form.experienceRequired}
          onChangeText={(value) => updateField('experienceRequired', value)}
        />
        <TextField
          label="Employment type"
          value={form.employmentType}
          onChangeText={(value) => updateField('employmentType', value)}
        />
        <TextField label="Salary range" value={form.salaryRange} onChangeText={(value) => updateField('salaryRange', value)} />
        <TextField label="Slug" value={form.slug} onChangeText={(value) => updateField('slug', value)} />
        <TextField
          label="Skills"
          placeholder="React Native, Expo, Firebase"
          value={skillsInput}
          onChangeText={setSkillsInput}
        />
        <TextField
          label="Description"
          value={form.description}
          onChangeText={(value) => updateField('description', value)}
        />
        <PrimaryButton disabled={submitting} label="Create job" onPress={() => void handleCreateJob()} />
      </View>
      <ThemedText type="subtitle">Existing jobs</ThemedText>
      {jobs.map((job) => (
        <View key={job.id} style={styles.jobCardWrap}>
          <StatusCard
            title={job.title}
            message={`${job.companyName} • ${job.location} • ${job.experienceRequired}`}
            footer={`${job.employmentType} • ${job.salaryRange} • ${job.skills.join(', ')}`}
          />
          <InlineLinkButton label={`Delete ${job.title}`} onPress={() => void handleDeleteJob(job.id)} />
        </View>
      ))}
      {!loading && !error && jobs.length === 0 ? (
        <EmptyState title="No jobs found" message="Create your first job listing to start accepting applications." />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  formSection: {
    gap: 12,
  },
  jobCardWrap: {
    gap: 8,
  },
});