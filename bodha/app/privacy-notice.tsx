import { InfoPage } from '@/components/common/info-page';

const sections = [
  {
    title: 'What information is collected',
    body: [
      'My Campus collects the information you provide when you create an account, complete your profile, and apply to available opportunities. This may include your name, email address, profile details, skills, and application activity.',
      'Only the information needed to operate the service and support the application process should be collected through the platform.',
    ],
  },
  {
    title: 'How information is used',
    body: [
      'Your information is used to manage authentication, maintain your account, support profile completion, and enable job applications within the platform.',
      'Profile and application information may be shown where required for platform functionality and the recruitment workflow tied to your use of My Campus.',
    ],
  },
  {
    title: 'Your responsibilities',
    body: [
      'You should provide accurate information and avoid sharing anything that is unnecessary for professional or recruitment-related use.',
      'If your information changes, you are responsible for keeping your profile current where relevant to your applications.',
    ],
  },
  {
    title: 'Protection and limits',
    body: [
      'Reasonable technical and administrative safeguards should be used to protect stored information.',
      'No online platform should be described as completely risk-free, and users should remain mindful of what they choose to share.',
    ],
  },
];

export default function PrivacyNoticeScreen() {
  return (
    <InfoPage
      eyebrow="MY CAMPUS"
      title="Privacy Notice"
      intro="This notice explains, at a high level, how information provided through My Campus may be collected, used, and handled within the platform."
      sections={sections}
    />
  );
}