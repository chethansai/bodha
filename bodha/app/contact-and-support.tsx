import { InfoPage } from '@/components/common/info-page';

const sections = [
  {
    title: 'What support covers',
    body: [
      'Support should help users with access issues, sign-in problems, profile completion difficulties, and other platform-related questions.',
      'Support does not replace employer communication and should not be treated as a hiring decision channel.',
    ],
  },
  {
    title: 'When to reach out',
    body: [
      'You should seek support if you cannot access your account, encounter broken application flows, or notice incorrect platform behaviour.',
      'You should also report suspicious activity, misleading listings, or requests for payment that appear connected to an opportunity shown through the platform.',
    ],
  },
  {
    title: 'What to include',
    body: [
      'When requesting help, include enough context to explain the issue clearly, such as the page involved, the action you were attempting, and the general problem you observed.',
      'Avoid sending unnecessary sensitive personal information when describing a support issue.',
    ],
  },
  {
    title: 'Current contact route',
    body: [
      'A dedicated support channel should be published here when final contact details are ready.',
      'Until then, this page serves as the support placeholder linked from the homepage footer.',
    ],
  },
];

export default function ContactAndSupportScreen() {
  return (
    <InfoPage
      eyebrow="MY CAMPUS"
      title="Contact and Support"
      intro="This page explains the type of help users should expect for platform-related issues and what information is useful when reporting a problem."
      sections={sections}
    />
  );
}