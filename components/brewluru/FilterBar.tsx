import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
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
  const [sheetOpen, setSheetOpen] = useState(false);
  const neighborhoods = getNeighborhoods();
  const tags = getFilterTags();
  const bands = getPriceBands();
  const { width } = useWindowDimensions();
  const wide = width >= 720;

  const set = (partial: Partial<CafeFilters>) => onChange({ ...filters, ...partial });

  const sheetCount = (filters.neighborhood ? 1 : 0) + (filters.tag ? 1 : 0);

  const canClear = useMemo(
    () =>
      Boolean(
        filters.query ||
          filters.neighborhood ||
          filters.tag ||
          filters.wifiYes ||
          filters.chargingYes ||
          filters.priceBand ||
          (showWorkToggle && filters.workFriendly)
      ),
    [filters, showWorkToggle]
  );

  const clearAll = () =>
    onChange({
      ...filters,
      query: '',
      neighborhood: null,
      tag: null,
      wifiYes: false,
      chargingYes: false,
      priceBand: null,
      workFriendly: showWorkToggle ? false : filters.workFriendly,
    });

  return (
    <View style={styles.wrap}>
      <TextInput
        value={filters.query}
        onChangeText={(query) => set({ query })}
        placeholder="Search cafes…"
        placeholderTextColor={colors.textMuted}
        style={styles.search}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        accessibilityLabel="Search cafes"
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        <TagChip
          label={sheetCount > 0 ? `More · ${sheetCount}` : 'Area & tags'}
          active={sheetCount > 0}
          onPress={() => setSheetOpen(true)}
        />
        {showWorkToggle ? (
          <TagChip
            label="Work"
            active={filters.workFriendly}
            onPress={() => set({ workFriendly: !filters.workFriendly })}
          />
        ) : null}
        <TagChip label="Wifi" active={filters.wifiYes} onPress={() => set({ wifiYes: !filters.wifiYes })} />
        <TagChip
          label="Charging"
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

      {filters.neighborhood || filters.tag || canClear ? (
        <View style={styles.activeRow}>
          {filters.neighborhood ? (
            <TagChip
              compact
              label={shortNeighborhood(filters.neighborhood)}
              active
              onPress={() => set({ neighborhood: null })}
            />
          ) : null}
          {filters.tag ? (
            <TagChip compact label={filters.tag} active onPress={() => set({ tag: null })} />
          ) : null}
          {canClear ? (
            <Pressable onPress={clearAll} accessibilityRole="button" accessibilityLabel="Clear filters">
              <Text style={styles.clear}>Clear</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      <Modal
        visible={sheetOpen}
        animationType="fade"
        transparent
        onRequestClose={() => setSheetOpen(false)}
      >
        <View style={styles.modalRoot}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setSheetOpen(false)}
            accessibilityRole="button"
            accessibilityLabel="Close filters"
          />
          <View style={[styles.sheet, wide && styles.sheetWide]}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Filters</Text>
              <Pressable onPress={() => setSheetOpen(false)} accessibilityRole="button">
                <Text style={styles.done}>Done</Text>
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.sheetBody}>
              <Text style={[styles.section, styles.sectionFirst]}>Neighborhood</Text>
              <View style={styles.wrapChips}>
                <TagChip
                  compact
                  label="All"
                  active={!filters.neighborhood}
                  onPress={() => set({ neighborhood: null })}
                />
                {neighborhoods.map((n) => (
                  <TagChip
                    key={n}
                    compact
                    label={shortNeighborhood(n)}
                    active={filters.neighborhood === n}
                    onPress={() => set({ neighborhood: filters.neighborhood === n ? null : n })}
                  />
                ))}
              </View>
              <Text style={styles.section}>Tags</Text>
              <View style={styles.wrapChips}>
                <TagChip compact label="Any" active={!filters.tag} onPress={() => set({ tag: null })} />
                {tags.map((tag) => (
                  <TagChip
                    key={tag}
                    compact
                    label={tag}
                    active={filters.tag === tag}
                    onPress={() => set({ tag: filters.tag === tag ? null : tag })}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    ...typography.body,
    color: colors.text,
  },
  row: {
    gap: spacing.sm,
    paddingVertical: 2,
    paddingRight: spacing.lg,
    alignItems: 'center',
  },
  activeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
  },
  clear: {
    ...typography.label,
    color: colors.accent,
    textTransform: 'uppercase',
  },
  section: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  sectionFirst: {
    marginTop: spacing.sm,
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(28, 20, 16, 0.35)',
  },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    maxHeight: '80%',
    width: '100%',
    paddingBottom: spacing.xl,
    zIndex: 2,
  },
  sheetWide: {
    maxWidth: 560,
    borderRadius: radius.lg,
    marginBottom: spacing.xl,
    maxHeight: '70%',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sheetTitle: { ...typography.subtitle, color: colors.text },
  done: { ...typography.label, color: colors.accent, textTransform: 'uppercase' },
  sheetBody: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    paddingTop: spacing.sm,
  },
  wrapChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
