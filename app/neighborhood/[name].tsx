import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { CafeCard } from '@/components/brewluru/CafeCard';
import { Disclaimer } from '@/components/brewluru/Disclaimer';
import { EmptyState } from '@/components/brewluru/EmptyState';
import {
  fromNeighborhoodParam,
  getCafesByNeighborhood,
  getNeighborhoods,
  toNeighborhoodParam,
} from '@/data/cafes';
import { spacing, typography } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/useThemeColors';

export function generateStaticParams() {
  return getNeighborhoods().map((name) => ({ name: toNeighborhoodParam(name) }));
}

export default function NeighborhoodScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const raw = typeof name === 'string' ? name : name?.[0] ?? '';
  const neighborhood = fromNeighborhoodParam(raw);
  const list = getCafesByNeighborhood(neighborhood);

  const styles = useThemedStyles((colors) =>
    StyleSheet.create({
      content: {
        padding: spacing.lg,
        paddingBottom: spacing.xxl,
        maxWidth: 900,
        width: '100%',
        alignSelf: 'center',
      },
      header: { marginBottom: spacing.md },
      subtitle: { ...typography.caption, color: colors.textSecondary },
      cardWrap: { marginBottom: spacing.sm },
      footer: { marginTop: spacing.lg },
    })
  );

  return (
    <>
      <Stack.Screen options={{ title: neighborhood || 'Neighborhood' }} />
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.subtitle}>
              {list.length} cafe{list.length === 1 ? '' : 's'}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState title="No cafes here" message="This neighborhood has no entries in the dataset." />
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Disclaimer />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardWrap}>
            <CafeCard cafe={item} />
          </View>
        )}
      />
    </>
  );
}
