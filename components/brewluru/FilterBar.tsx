import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { CafeFilters, PriceBand } from '@/types/cafe';
import { getFilterTags, getNeighborhoods, getPriceBands } from '@/data/cafes';
import { TagChip } from './TagChip';
import { colors, radius, spacing, typography } from '@/constants/theme';

type Props = {
  filters: CafeFilters;
  onChange: (next: CafeFilters) => void;
  showWorkToggle?: boolean;
};

export function FilterBar({ filters, onChange, showWorkToggle = true }: Props) {
  const neighborhoods = getNeighborhoods();
  const tags = getFilterTags();
  const bands = getPriceBands();

  const set = (partial: Partial<CafeFilters>) => onChange({ ...filters, ...partial });

  return (
    <View style={styles.wrap}>
      <TextInput
        value={filters.query}
        onChangeText={(query) => set({ query })}
        placeholder="Search cafes, beans, neighborhoods…"
        placeholderTextColor={colors.textMuted}
        style={styles.search}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        accessibilityLabel="Search cafes"
      />

      <Text style={styles.section}>Neighborhood</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        <TagChip
          label="All areas"
          active={!filters.neighborhood}
          onPress={() => set({ neighborhood: null })}
        />
        {neighborhoods.map((n) => (
          <TagChip
            key={n}
            label={shortNeighborhood(n)}
            active={filters.neighborhood === n}
            onPress={() => set({ neighborhood: filters.neighborhood === n ? null : n })}
          />
        ))}
      </ScrollView>

      <Text style={styles.section}>Amenities & price</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {showWorkToggle ? (
          <TagChip
            label="Work-friendly"
            active={filters.workFriendly}
            onPress={() => set({ workFriendly: !filters.workFriendly })}
          />
        ) : null}
        <TagChip
          label="Wifi yes"
          active={filters.wifiYes}
          onPress={() => set({ wifiYes: !filters.wifiYes })}
        />
        <TagChip
          label="Charging yes"
          active={filters.chargingYes}
          onPress={() => set({ chargingYes: !filters.chargingYes })}
        />
        {bands.map((band) => (
          <TagChip
            key={band}
            label={band}
            active={filters.priceBand === band}
            onPress={() => set({ priceBand: filters.priceBand === band ? null : (band as PriceBand) })}
          />
        ))}
      </ScrollView>

      <Text style={styles.section}>Tags</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        <TagChip label="Any tag" active={!filters.tag} onPress={() => set({ tag: null })} />
        {tags.map((tag) => (
          <TagChip
            key={tag}
            label={tag}
            active={filters.tag === tag}
            onPress={() => set({ tag: filters.tag === tag ? null : tag })}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function shortNeighborhood(name: string): string {
  if (name.length <= 28) return name;
  return name.slice(0, 26) + '…';
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.sm },
  search: {
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    ...typography.body,
    color: colors.text,
  },
  section: {
    ...typography.label,
    color: colors.textMuted,
    marginTop: spacing.sm,
    textTransform: 'uppercase',
  },
  row: {
    gap: spacing.sm,
    paddingVertical: 2,
    paddingRight: spacing.lg,
  },
});
