import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface JobDetailSectionProps {
  title: string;
  value: string;
}

export function JobDetailSection({ title, value }: JobDetailSectionProps) {
  return (
    <View style={styles.section}>
      <ThemedText type="defaultSemiBold">{title}</ThemedText>
      <ThemedText>{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 6,
  },
});