import type { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';

interface ScreenProps extends PropsWithChildren {
  scrollable?: boolean;
}

export function Screen({ children, scrollable = true }: ScreenProps) {
  const content = scrollable ? (
    <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
  ) : (
    <View style={styles.content}>{children}</View>
  );

  return (
    <ThemedView style={styles.background}>
      <SafeAreaView style={styles.safeArea}>{content}</SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    gap: 16,
    backgroundColor: '#f4efe6',
  },
});