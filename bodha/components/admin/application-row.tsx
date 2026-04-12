import { StatusCard } from '@/components/common/status-card';
import { formatDate } from '@/helpers/formatters';
import type { JobApplicationDocument } from '@/types/application';

interface ApplicationRowProps {
  application: JobApplicationDocument;
}

export function ApplicationRow({ application }: ApplicationRowProps) {
  return (
    <StatusCard
      title={application.jobTitle}
      message={`${application.companyName} • ${application.fullName}`}
      footer={`Applied on ${formatDate(application.appliedAt)} • ${application.userEmail}`}
    />
  );
}