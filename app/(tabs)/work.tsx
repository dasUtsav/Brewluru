import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CafeCard } from '@/components/brewluru/CafeCard';
import { Disclaimer } from '@/components/brewluru/Disclaimer';
import { EmptyState } from '@/components/brewluru/EmptyState';
import { FilterBar } from '@/components/brewluru/FilterBar';
import { filterCafes } from '@/data/cafes';
import type { CafeFilters } from '@/types/cafe';
import { colors, spacing, typography } from '@/constants/theme';

const initialFilters: CafeFilters = {
  query: '',
  neighborhood: null,
  tag: null,
  wifiYes: false,
  chargingYes: false,
  priceBand: null,
  workFriendly: true,
};

export default function WorkScreen() {
  const [filters, setFilters] = useState<CafeFilters>(initialFilters);

  const results = useMemo(
    () => filterCafes({ ...filters, workFriendly: true }),
    [filters]
  );

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Work-friendly cafes</Text>
          <Text style={styles.subtitle}>
            Preset: wifi or charging reported as yes. Many independents are still marked
            unknown — absence from this list does not mean they are not laptop-friendly.
          </Text>
          <FilterBar
            filters={{ ...filters, workFriendly: true }}
            onChange={(next) => setFilters({ ...next, workFriendly: true })}
            showWorkToggle={false}
          />
          <Text style={styles.count}>{results.length} cafes</Text>
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          title="No work-friendly matches"
          message="Loosen filters — verified wifi/charging data is sparse for independents."
        />
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
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },
  header: { gap: spacing.md, marginBottom: spacing.md },
  title: { ...typography.title, color: colors.text },
  subtitle: { ...typography.body, color: colors.textSecondary },
  count: { ...typography.caption, color: colors.textMuted, fontWeight: '600' },
  cardWrap: { marginBottom: spacing.md },
  footer: { marginTop: spacing.lg },
});
