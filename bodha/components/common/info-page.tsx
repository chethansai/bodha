import { StyleSheet, View } from 'react-native';

import { Screen } from '@/components/common/screen';
import { ThemedText } from '@/components/themed-text';

interface InfoPageSection {
  title: string;
  body: string[];
}

interface InfoPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  sections: InfoPageSection[];
}

export function InfoPage({ eyebrow, title, intro, sections }: InfoPageProps) {
  return (
    <Screen>
      <View style={styles.header}>
        <ThemedText style={styles.eyebrow}>{eyebrow}</ThemedText>
        <ThemedText type="title" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText style={styles.intro}>{intro}</ThemedText>
      </View>

      {sections.map((section) => (
        <View key={section.title} style={styles.card}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {section.title}
          </ThemedText>
          {section.body.map((paragraph) => (
            <ThemedText key={paragraph} style={styles.body}>
              {paragraph}
            </ThemedText>
          ))}
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 10,
  },
  eyebrow: {
    color: '#b56c00',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.3,
  },
  title: {
    color: '#12283b',
    fontSize: 32,
    lineHeight: 38,
  },
  intro: {
    color: '#465a6d',
  },
  card: {
    backgroundColor: '#fffaf2',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eadfcf',
    gap: 10,
  },
  sectionTitle: {
    color: '#12283b',
    fontSize: 20,
  },
  body: {
    color: '#4b5d73',
  },
});