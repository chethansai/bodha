import { Link, Redirect, router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { PrimaryButton } from '@/components/common/primary-button';
import { Screen } from '@/components/common/screen';
import { ThemedText } from '@/components/themed-text';
import { ROUTES } from '@/constants/app';
import { useAuthGate } from '@/providers/auth-provider';

const highlights = [
  {
    title: 'Browse relevant roles',
    description:
      'Explore openings for students and early-career candidates with clear role details, skill expectations, and application information.',
  },
  {
    title: 'Apply with one profile',
    description:
      'Set up your profile once and use it across applications without re-entering the same information every time.',
  },
  {
    title: 'Stay organised',
    description:
      'Keep your applications in one place so you can follow your job search with less confusion and less manual tracking.',
  },
];

const flow = [
  'Create your account and complete your profile once.',
  'Explore available roles by company, location, and fit.',
  'Apply directly and keep track of your submissions from your dashboard.',
];

const sections = [
  {
    title: 'How My Campus works',
    body:
      'My Campus brings job discovery and job applications into one place, so you can focus on finding the right opportunity instead of managing scattered links and repeated forms.',
  },
  {
    title: 'Who it is for',
    body:
      'It is built for students, fresh graduates, and early-career professionals who want a simple way to explore roles and manage applications with less friction.',
  },
  {
    title: 'What you can expect',
    body:
      'Clear job descriptions, reusable profile information, application tracking, and a straightforward experience designed to keep the process practical and easy to follow.',
  },
];

const privacyItems = [
  'Your account information is used to operate the platform, support sign-in, and enable job applications.',
  'Profile details you provide are used only where needed for platform functionality and the application process.',
  'You should share only accurate information that you are comfortable using for professional and recruitment-related purposes.',
  'Reasonable technical and administrative safeguards are used to protect stored data, but no online service should be presented as completely risk-free.',
];

const legalItems = [
  'Platform branding, interface design, and original content remain protected unless stated otherwise.',
  'Copyright and all rights reserved notices are included to make ownership and permitted use clear.',
  'Nothing on this platform should be interpreted as a guarantee of placement, employer response, or employment outcome.',
  'Third-party company names, logos, and job details should be displayed only where there is a valid basis to do so.',
];

const disclaimers = [
  'Using the platform does not guarantee interviews, callbacks, offers, or employment.',
  'Job information may change, expire, or be withdrawn without notice.',
  'Candidates remain responsible for reviewing the suitability, legitimacy, and current status of an opportunity before acting on it.',
  'Applicants should not be asked to make payments in exchange for application consideration through this platform.',
];

const footerLinks = [
  { label: 'Privacy notice', href: '/privacy-notice' },
  { label: 'Terms of use', href: '/terms-of-use' },
  { label: 'Data handling', href: '/data-handling' },
  { label: 'Contact and support', href: '/contact-and-support' },
] as const;

function SectionCard({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.card}>
      <ThemedText type="subtitle" style={styles.cardTitle}>
        {title}
      </ThemedText>
      <ThemedText style={styles.cardBody}>{body}</ThemedText>
    </View>
  );
}

function BulletList({ items, textStyle }: { items: string[]; textStyle?: object }) {
  return (
    <View style={styles.list}>
      {items.map((item) => (
        <View key={item} style={styles.listItem}>
          <View style={styles.bullet} />
          <ThemedText style={[styles.listText, textStyle]}>{item}</ThemedText>
        </View>
      ))}
    </View>
  );
}

export default function IndexScreen() {
  const { status } = useAuthGate();

  if (status === 'ready') {
    return <Redirect href={ROUTES.jobs} />;
  }

  if (status === 'emailUnverified') {
    return <Redirect href={ROUTES.emailConfirmation} />;
  }

  if (status === 'profileIncomplete') {
    return <Redirect href={ROUTES.completeProfile} />;
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <ThemedText style={styles.heroBadgeText}>MY CAMPUS</ThemedText>
          </View>

          <ThemedText type="title" style={styles.heroTitle}>
            Find the right opportunity and apply from one place.
          </ThemedText>

          <ThemedText style={styles.heroDescription}>
            Discover campus and early-career roles, build your profile once, and keep track of every application through a single, straightforward workflow.
          </ThemedText>

          <View style={styles.heroActions}>
            <PrimaryButton label="Login" onPress={() => router.push(ROUTES.login)} />
            <Pressable accessibilityRole="button" onPress={() => router.push(ROUTES.signup)} style={styles.secondaryButton}>
              <ThemedText style={styles.secondaryButtonText}>Create account</ThemedText>
            </Pressable>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <ThemedText style={styles.metricLabel}>Find</ThemedText>
              <ThemedText style={styles.metricValue}>Open roles</ThemedText>
            </View>
            <View style={styles.metricCard}>
              <ThemedText style={styles.metricLabel}>Apply</ThemedText>
              <ThemedText style={styles.metricValue}>With one profile</ThemedText>
            </View>
            <View style={styles.metricCard}>
              <ThemedText style={styles.metricLabel}>Track</ThemedText>
              <ThemedText style={styles.metricValue}>Your progress</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionHeading}>
            A simpler way to manage your job search
          </ThemedText>
          <ThemedText style={styles.sectionIntro}>
            Everything on My Campus is designed to make job discovery and applications easier to understand, easier to manage, and easier to revisit later.
          </ThemedText>
          {sections.map((section) => (
            <SectionCard key={section.title} title={section.title} body={section.body} />
          ))}
        </View>

        <View style={styles.accentPanel}>
          <View style={styles.accentHeaderRow}>
            <ThemedText type="subtitle" style={styles.accentTitle}>
              Everything you need to get started
            </ThemedText>
            <ThemedText style={styles.accentEyebrow}>CLEAR INFORMATION. NO NOISE.</ThemedText>
          </View>
          <BulletList
            items={[
              'Browse available job opportunities in one place.',
              'Create your account and maintain one reusable profile.',
              'Apply without repeating the same details across every opportunity.',
              'Track submitted applications from a single dashboard.',
              'Review privacy, usage, and disclaimer information before you begin.',
              'Use clear entry points to log in, sign up, and continue your search.',
            ]}
          />
        </View>

        <View style={styles.twoColumnSection}>
          <View style={styles.columnCard}>
            <ThemedText type="subtitle" style={styles.columnTitle}>
              Get started in three steps
            </ThemedText>
            <BulletList items={flow} />
          </View>

          <View style={styles.columnCardDark}>
            <ThemedText type="subtitle" style={styles.columnTitleDark}>
              Built for a clearer process
            </ThemedText>
            <BulletList
              textStyle={styles.listTextLight}
              items={[
                'Straightforward role information instead of vague listings.',
                'A reusable profile instead of repeated application forms.',
                'Visible privacy and disclaimer information from the first page.',
                'A clear starting point whether you are new or returning.',
              ]}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionHeading}>
            Why candidates use My Campus
          </ThemedText>
          <View style={styles.grid}>
            {highlights.map((item) => (
              <View key={item.title} style={styles.featureCard}>
                <ThemedText type="subtitle" style={styles.featureTitle}>
                  {item.title}
                </ThemedText>
                <ThemedText style={styles.featureBody}>{item.description}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionHeading}>
            How your information is handled
          </ThemedText>
          <ThemedText style={styles.sectionIntro}>
            We keep privacy language direct and practical so you understand what information is used, why it is used, and what limits still apply.
          </ThemedText>
          <View style={styles.legalCard}>
            <BulletList items={privacyItems} />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionHeading}>
            Legal and ownership
          </ThemedText>
          <View style={styles.legalCard}>
            <BulletList items={legalItems} />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionHeading}>
            What to know before applying
          </ThemedText>
          <View style={styles.warningCard}>
            <BulletList items={disclaimers} />
          </View>
        </View>

        <View style={styles.footer}>
          <ThemedText style={styles.footerBrand}>My Campus</ThemedText>
          <View style={styles.footerLinksRow}>
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} asChild>
                <Pressable accessibilityRole="link" style={styles.footerLinkPressable}>
                  <ThemedText style={styles.footerLinkText}>{item.label}</ThemedText>
                </Pressable>
              </Link>
            ))}
          </View>
          <ThemedText style={styles.footerCopy}>
            Copyright 2026 My Campus. All rights reserved.
          </ThemedText>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 24,
    paddingBottom: 48,
  },
  hero: {
    backgroundColor: '#12324a',
    borderRadius: 28,
    paddingHorizontal: 22,
    paddingVertical: 24,
    gap: 18,
    borderWidth: 1,
    borderColor: '#2d5877',
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f4c36b',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  heroBadgeText: {
    color: '#12324a',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  heroTitle: {
    color: '#fffaf2',
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '800',
  },
  heroDescription: {
    color: '#d6e4ef',
    fontSize: 16,
    lineHeight: 25,
  },
  heroActions: {
    gap: 12,
  },
  secondaryButton: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#7ba1bc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  secondaryButtonText: {
    color: '#f8f0df',
    fontSize: 16,
    fontWeight: '700',
  },
  metricsRow: {
    gap: 12,
  },
  metricCard: {
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#f8f0df',
    gap: 6,
  },
  metricLabel: {
    color: '#8a5b11',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  metricValue: {
    color: '#12283b',
    fontSize: 18,
    fontWeight: '700',
  },
  section: {
    gap: 14,
  },
  sectionHeading: {
    fontSize: 26,
    lineHeight: 30,
    color: '#12283b',
  },
  sectionIntro: {
    color: '#465a6d',
  },
  card: {
    backgroundColor: '#fffaf2',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eadfcf',
    gap: 8,
  },
  cardTitle: {
    color: '#12283b',
    fontSize: 20,
  },
  cardBody: {
    color: '#4b5d73',
  },
  accentPanel: {
    backgroundColor: '#d97706',
    borderRadius: 24,
    padding: 20,
    gap: 16,
  },
  accentHeaderRow: {
    gap: 8,
  },
  accentTitle: {
    color: '#fff7ed',
    fontSize: 24,
    lineHeight: 30,
  },
  accentEyebrow: {
    color: '#fff1cf',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  list: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 999,
    marginTop: 8,
    backgroundColor: '#12324a',
  },
  listText: {
    flex: 1,
    color: '#24384a',
  },
  listTextLight: {
    color: '#f8f0df',
  },
  twoColumnSection: {
    gap: 16,
  },
  columnCard: {
    backgroundColor: '#fffaf2',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eadfcf',
    gap: 12,
  },
  columnCardDark: {
    backgroundColor: '#1f435d',
    borderRadius: 22,
    padding: 18,
    gap: 12,
  },
  columnTitle: {
    color: '#12283b',
  },
  columnTitleDark: {
    color: '#fffaf2',
  },
  grid: {
    gap: 14,
  },
  featureCard: {
    backgroundColor: '#f1e3cb',
    borderRadius: 20,
    padding: 18,
    gap: 8,
  },
  featureTitle: {
    color: '#7b4d0c',
    fontSize: 20,
  },
  featureBody: {
    color: '#473526',
  },
  legalCard: {
    backgroundColor: '#fffaf2',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eadfcf',
    gap: 16,
  },
  footerLinksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  footerLinkPressable: {
    paddingVertical: 2,
  },
  footerLinkText: {
    color: '#6b5a43',
    fontSize: 11,
    fontWeight: '600',
  },
  warningCard: {
    backgroundColor: '#fff0df',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#f2c28b',
  },
  footer: {
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#d8c9b2',
    paddingTop: 20,
  },
  footerBrand: {
    fontSize: 20,
    fontWeight: '800',
    color: '#12283b',
  },
  footerCopy: {
    color: '#3f5367',
    fontWeight: '700',
  },
});