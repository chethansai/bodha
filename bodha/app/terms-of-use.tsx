import { InfoPage } from '@/components/common/info-page';

const sections = [
  {
    title: 'Using the platform',
    body: [
      'My Campus is intended to help users discover job opportunities, manage profile information, and submit applications through a single platform experience.',
      'You are expected to use the service lawfully, honestly, and only for legitimate recruitment-related purposes.',
    ],
  },
  {
    title: 'Account use',
    body: [
      'You are responsible for the activity associated with your account and for maintaining the security of your sign-in credentials.',
      'Accounts should not be used to impersonate another person, submit misleading information, or interfere with the normal operation of the service.',
    ],
  },
  {
    title: 'Job listings and applications',
    body: [
      'My Campus provides access to job-related information and application workflows, but use of the platform does not guarantee interviews, offers, or employment.',
      'Job postings may change, close, or be removed without notice, and users remain responsible for reviewing the details of each opportunity before applying.',
    ],
  },
  {
    title: 'Content and ownership',
    body: [
      'Platform branding, interface design, and original content remain protected unless stated otherwise.',
      'Third-party names, logos, and listing details belong to their respective owners where applicable and should not be reused outside valid platform use.',
    ],
  },
];

export default function TermsOfUseScreen() {
  return (
    <InfoPage
      eyebrow="MY CAMPUS"
      title="Terms of Use"
      intro="These terms outline the basic expectations for using My Campus responsibly and understanding the limits of what the platform provides."
      sections={sections}
    />
  );
}