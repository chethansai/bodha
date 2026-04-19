import { InfoPage } from '@/components/common/info-page';

const sections = [
  {
    title: 'Account and profile records',
    body: [
      'Account and profile details are handled to support sign-in, profile completion, and reuse of information across applications.',
      'This helps reduce repeated data entry while keeping candidate information available for the workflows users choose to use.',
    ],
  },
  {
    title: 'Application activity',
    body: [
      'When you apply through My Campus, application-related records may be stored so you can review your submissions and maintain continuity in your job search.',
      'This information should be handled only where necessary to support the application process and related platform features.',
    ],
  },
  {
    title: 'Access and visibility',
    body: [
      'Information should be visible only to the parts of the platform and workflows that require it for legitimate operation.',
      'Users should avoid storing unnecessary sensitive data in free-form fields or profile sections unless it is genuinely needed for an application.',
    ],
  },
  {
    title: 'Operational limits',
    body: [
      'Data handling practices should be reviewed and improved over time, but no summary page should suggest absolute control, perfect security, or legal guarantees beyond what is actually in place.',
      'Users should rely on this page as a practical overview rather than as a substitute for fuller policy documentation when that is published.',
    ],
  },
];

export default function DataHandlingScreen() {
  return (
    <InfoPage
      eyebrow="MY CAMPUS"
      title="Data Handling"
      intro="This page explains how account, profile, and application information is handled within My Campus at an operational level."
      sections={sections}
    />
  );
}