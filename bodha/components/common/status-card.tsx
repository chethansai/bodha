import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface StatusCardProps {
  title: string;
  message?: string;
  loading?: boolean;
  footer?: string;
}

export function StatusCard({ title, message, loading = false, footer }: StatusCardProps) {
  return (
    <ThemedView style={styles.card}>
      <View style={styles.header}>
        <ThemedText type="subtitle">{title}</ThemedText>
        {loading ? <ActivityIndicator /> : null}
      </View>
      {message ? <ThemedText>{message}</ThemedText> : null}
      {footer ? <ThemedText style={styles.footer}>{footer}</ThemedText> : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    gap: 8,
    backgroundColor: '#fffaf2',
    borderWidth: 1,
    borderColor: '#eadfcf',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  footer: {
    color: '#516173',
  },
});