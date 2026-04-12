import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface AdminStatCardProps {
  label: string;
  value: number;
}

export function AdminStatCard({ label, value }: AdminStatCardProps) {
  return (
    <ThemedView style={styles.card}>
      <ThemedText type="title">{value}</ThemedText>
      <ThemedText>{label}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    gap: 8,
    backgroundColor: '#f3f7ff',
    minWidth: 140,
  },
});