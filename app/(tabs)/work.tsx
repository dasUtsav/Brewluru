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

  const results = useMemo(() => filterCafes({ ...filters, workFriendly: true }), [filters]);

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.lede}>
            Wifi or charging reported yes. Unknown amenities are omitted — confirm on-site.
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },
  header: { gap: spacing.sm, marginBottom: spacing.md },
  lede: { ...typography.caption, color: colors.textSecondary },
  count: { ...typography.caption, color: colors.textMuted },
  cardWrap: { marginBottom: spacing.sm },
  footer: { marginTop: spacing.md },
});
