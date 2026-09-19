import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { CafeCard } from '@/components/brewluru/CafeCard';
import { Disclaimer } from '@/components/brewluru/Disclaimer';
import { EmptyState } from '@/components/brewluru/EmptyState';
import { FilterBar } from '@/components/brewluru/FilterBar';
import { cafes, filterCafes } from '@/data/cafes';
import type { CafeFilters } from '@/types/cafe';
import { spacing, typography } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/useThemeColors';

const initialFilters: CafeFilters = {
  query: '',
  neighborhood: null,
  tag: null,
  wifiYes: false,
  chargingYes: false,
  priceBand: null,
  workFriendly: false,
};

export default function HomeScreen() {
  const [filters, setFilters] = useState<CafeFilters>(initialFilters);
  const { width } = useWindowDimensions();
  const columns = width >= 1100 ? 3 : width >= 720 ? 2 : 1;

  const results = useMemo(() => filterCafes(filters), [filters]);

  const styles = useThemedStyles((colors) =>
    StyleSheet.create({
      content: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.xxl,
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
      },
      header: { gap: spacing.sm, marginBottom: spacing.md },
      brand: { ...typography.hero, color: colors.accentStrong },
      tagline: { ...typography.caption, color: colors.textSecondary, marginTop: -4 },
      count: { ...typography.caption, color: colors.textMuted },
      row: { gap: spacing.md },
      cardWrap: { marginBottom: spacing.md },
      cardWrapMulti: { flex: 1 },
      footer: { marginTop: spacing.md },
    })
  );

  return (
    <FlatList
      data={results}
      key={columns}
      numColumns={columns}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      columnWrapperStyle={columns > 1 ? styles.row : undefined}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.brand}>Brewluru</Text>
          <Text style={styles.tagline}>Specialty cafes in Bengaluru</Text>
          <FilterBar filters={filters} onChange={setFilters} />
          <Text style={styles.count}>
            {results.length} of {cafes.length}
          </Text>
        </View>
      }
      ListEmptyComponent={
        <EmptyState
          title="No cafes match"
          message="Try clearing filters or searching a different neighborhood, tag, or amenity."
        />
      }
      ListFooterComponent={
        <View style={styles.footer}>
          <Disclaimer />
        </View>
      }
      renderItem={({ item }) => (
        <View style={[styles.cardWrap, columns > 1 && styles.cardWrapMulti]}>
          <CafeCard cafe={item} />
        </View>
      )}
    />
  );
}
