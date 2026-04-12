import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { JobCardModel } from '@/types/job';

interface JobCardProps {
  job: JobCardModel;
  onPress: () => void;
}

export function JobCard({ job, onPress }: JobCardProps) {
  return (
    <Pressable onPress={onPress}>
      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">{job.title}</ThemedText>
        <ThemedText>{job.companyName}</ThemedText>
        <View style={styles.row}>
          <ThemedText>{job.location}</ThemedText>
          <ThemedText>{job.experienceRequired}</ThemedText>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 16,
    gap: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dde6f2',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});