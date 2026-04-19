import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface BrandHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
}

export function BrandHeader({ eyebrow = 'MY CAMPUS', title, subtitle }: BrandHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <ThemedText style={styles.eyebrow}>{eyebrow}</ThemedText>
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  eyebrow: {
    color: '#d97706',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.6,
  },
  title: {
    fontSize: 34,
    lineHeight: 38,
  },
  subtitle: {
    color: '#4b5d73',
    fontSize: 16,
    lineHeight: 24,
  },
});