import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface InlineLinkButtonProps {
  label: string;
  onPress: () => void;
}

export function InlineLinkButton({ label, onPress }: InlineLinkButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <ThemedText style={styles.label}>{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
  },
  label: {
    color: '#0b63ce',
    fontWeight: '600',
  },
});