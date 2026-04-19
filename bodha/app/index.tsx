import { Redirect, router } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { ROUTES } from '@/constants/app';
import { useAuthGate } from '@/providers/auth-provider';
import { Screen } from '@/components/common/screen';
import { BrandHeader } from '@/components/common/brand-header';
import { ThemedText } from '@/components/themed-text';
import { PrimaryButton } from '@/components/common/primary-button';
import { StatusCard } from '@/components/common/status-card';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function IndexScreen() {
  const { status } = useAuthGate();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  // Landing page for logged out users
  if (status === 'loggedOut') {
    return (
      <Screen>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View style={{ paddingVertical: 40, paddingHorizontal: 20, alignItems: 'center' }}>
            <ThemedText
              type="title"
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                marginBottom: 12,
                textAlign: 'center',
              }}
            >
              Welcome to My Campus
            </ThemedText>
            <ThemedText
              type="subtitle"
              style={{
                fontSize: 16,
                marginBottom: 24,
                textAlign: 'center',
                lineHeight: 24,
              }}
            >
              Discover amazing job opportunities and connect with top companies in your field.
            </ThemedText>
          </View>

          {/* How It Works Section */}
          <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
            <ThemedText
              type="title"
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 20,
                textAlign: 'center',
              }}
            >
              How It Works
            </ThemedText>

            <StatusCard title="1. Create Account" description="Sign up and complete your profile with your skills and experience." />
            <StatusCard
              title="2. Browse Jobs"
              description="Explore job listings from companies actively hiring in your domain."
              style={{ marginTop: 12 }}
            />
            <StatusCard
              title="3. Apply Now"
              description="Submit your applications directly through the portal and track their status."
              style={{ marginTop: 12 }}
            />
            <StatusCard
              title="4. Connect & Succeed"
              description="Get feedback, interview updates, and land your dream opportunity."
              style={{ marginTop: 12 }}
            />
          </View>

          {/* Key Features Section */}
          <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
            <ThemedText
              type="title"
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 20,
                textAlign: 'center',
              }}
            >
              Why Choose My Campus?
            </ThemedText>

            <StatusCard title="🎯 Curated Opportunities" description="Vetted job listings tailored to your skills and career goals." />
            <StatusCard
              title="📱 Easy to Use"
              description="Intuitive interface designed for seamless job hunting and application management."
              style={{ marginTop: 12 }}
            />
            <StatusCard
              title="🔒 Secure & Private"
              description="Your data is protected with industry-leading security standards."
              style={{ marginTop: 12 }}
            />
            <StatusCard
              title="⚡ Real-time Updates"
              description="Get instant notifications about application status, new jobs, and company updates."
              style={{ marginTop: 12 }}
            />
          </View>

          {/* Privacy & Compliance Section */}
          <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
            <ThemedText
              type="title"
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 20,
                textAlign: 'center',
              }}
            >
              Privacy & Compliance
            </ThemedText>

            <ThemedText
              type="subtitle"
              style={{
                fontSize: 14,
                marginBottom: 16,
                lineHeight: 22,
              }}
            >
              <ThemedText type="subtitle" style={{ fontWeight: 'bold' }}>
                Data Protection:{'\n'}
              </ThemedText>
              We are committed to protecting your personal information. All user data is encrypted and stored securely. We comply with GDPR, CCPA, and other international data protection regulations.
            </ThemedText>

            <ThemedText
              type="subtitle"
              style={{
                fontSize: 14,
                marginBottom: 16,
                lineHeight: 22,
              }}
            >
              <ThemedText type="subtitle" style={{ fontWeight: 'bold' }}>
                Email Verification:{'\n'}
              </ThemedText>
              All users must verify their email addresses before accessing the platform. This ensures a secure and trustworthy community of job seekers and employers.
            </ThemedText>

            <ThemedText
              type="subtitle"
              style={{
                fontSize: 14,
                marginBottom: 16,
                lineHeight: 22,
              }}
            >
              <ThemedText type="subtitle" style={{ fontWeight: 'bold' }}>
                Profile Information:{'\n'}
              </ThemedText>
              Your profile information including skills, experience, and resume data is optional but helps companies find the right match. You control what information is visible to employers.
            </ThemedText>
          </View>

          {/* Disclaimers Section */}
          <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
            <ThemedText
              type="title"
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 20,
                textAlign: 'center',
              }}
            >
              Important Disclaimers
            </ThemedText>

            <ThemedText
              type="subtitle"
              style={{
                fontSize: 14,
                marginBottom: 16,
                lineHeight: 22,
              }}
            >
              <ThemedText type="subtitle" style={{ fontWeight: 'bold' }}>
                Accuracy of Information:{'\n'}
              </ThemedText>
              While we strive to ensure all job listings are accurate, My Campus does not guarantee the accuracy, completeness, or authenticity of any job posting or employer information. Users are responsible for verifying job details independently.
            </ThemedText>

            <ThemedText
              type="subtitle"
              style={{
                fontSize: 14,
                marginBottom: 16,
                lineHeight: 22,
              }}
            >
              <ThemedText type="subtitle" style={{ fontWeight: 'bold' }}>
                No Employment Guarantee:{'\n'}
              </ThemedText>
              My Campus is a platform connecting job seekers with employers. We do not guarantee employment or job offers. Success depends on your qualifications and the hiring decisions of employers.
            </ThemedText>

            <ThemedText
              type="subtitle"
              style={{
                fontSize: 14,
                marginBottom: 16,
                lineHeight: 22,
              }}
            >
              <ThemedText type="subtitle" style={{ fontWeight: 'bold' }}>
                Scam Prevention:{'\n'}
              </ThemedText>
              Be cautious of job postings requesting upfront payments or personal information. My Campus does not monitor transactions between users and employers. Report suspicious activities immediately.
            </ThemedText>

            <ThemedText
              type="subtitle"
              style={{
                fontSize: 14,
                marginBottom: 16,
                lineHeight: 22,
              }}
            >
              <ThemedText type="subtitle" style={{ fontWeight: 'bold' }}>
                Third-party Links:{'\n'}
              </ThemedText>
              We are not responsible for third-party websites or services linked from our platform. Please review their privacy and terms policies independently.
            </ThemedText>
          </View>

          {/* FAQ Section */}
          <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
            <ThemedText
              type="title"
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 20,
                textAlign: 'center',
              }}
            >
              Frequently Asked Questions
            </ThemedText>

            <StatusCard
              title="Is My Campus free to use?"
              description="Yes! My Campus is free for job seekers. We're committed to making job hunting accessible to everyone."
            />
            <StatusCard
              title="How do I apply for jobs?"
              description="Create an account, complete your profile, and click 'Apply' on any job listing. You can track all your applications in your dashboard."
              style={{ marginTop: 12 }}
            />
            <StatusCard
              title="Can I edit my profile?"
              description="Yes, you can update your profile information, skills, and experience anytime from your account settings."
              style={{ marginTop: 12 }}
            />
            <StatusCard
              title="How do I report a suspicious job listing?"
              description="Use the report button on the job listing page. Our team reviews all reports and takes appropriate action."
              style={{ marginTop: 12 }}
            />
            <StatusCard
              title="When will I hear back about my application?"
              description="Timeline depends on the employer. Most companies review applications within 2-4 weeks. You'll receive notifications for updates."
              style={{ marginTop: 12 }}
            />
          </View>

          {/* CTA Section */}
          <View style={{ paddingHorizontal: 20, marginVertical: 40, alignItems: 'center' }}>
            <ThemedText
              type="subtitle"
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 24,
                textAlign: 'center',
              }}
            >
              Ready to find your next opportunity?
            </ThemedText>
            <PrimaryButton label="Log In" onPress={() => router.push(ROUTES.login)} />
            <ThemedText
              type="subtitle"
              style={{
                fontSize: 14,
                marginTop: 16,
                textAlign: 'center',
              }}
            >
              New here?{' '}
              <ThemedText
                type="subtitle"
                style={{
                  fontSize: 14,
                  color: '#007AFF',
                  fontWeight: 'bold',
                }}
                onPress={() => router.push(ROUTES.signup)}
              >
                Create an account
              </ThemedText>
            </ThemedText>
          </View>

          {/* Footer Section */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 24,
              borderTopWidth: 1,
              borderTopColor: '#e5e5e5',
              marginTop: 20,
            }}
          >
            <ThemedText
              type="subtitle"
              style={{
                fontSize: 12,
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              © 2024-2026 My Campus. All rights reserved.
            </ThemedText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 16,
              }}
            >
              <ThemedText
                type="subtitle"
                style={{
                  fontSize: 12,
                  color: '#007AFF',
                }}
              >
                Privacy Policy
              </ThemedText>
              <ThemedText
                type="subtitle"
                style={{
                  fontSize: 12,
                }}
              >
                •
              </ThemedText>
              <ThemedText
                type="subtitle"
                style={{
                  fontSize: 12,
                  color: '#007AFF',
                }}
              >
                Terms of Service
              </ThemedText>
              <ThemedText
                type="subtitle"
                style={{
                  fontSize: 12,
                }}
              >
                •
              </ThemedText>
              <ThemedText
                type="subtitle"
                style={{
                  fontSize: 12,
                  color: '#007AFF',
                }}
              >
                Contact Us
              </ThemedText>
            </View>
          </View>
        </ScrollView>
      </Screen>
    );
  }

  if (status === 'emailUnverified') {
    return <Redirect href={ROUTES.emailConfirmation} />;
  }

  if (status === 'profileIncomplete') {
    return <Redirect href={ROUTES.completeProfile} />;
  }

  if (status === 'ready') {
    return <Redirect href={ROUTES.jobs} />;
  }

  return null;
}