import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import type { Cafe } from '@/types/cafe';
import { AmenityChip } from './AmenityChip';
import { colors, radius, spacing, typography } from '@/constants/theme';

type Props = {
  cafe: Cafe;
};

export function CafeCard({ cafe }: Props) {
  const { width } = useWindowDimensions();
  const wide = width >= 720;
  const extraTags = Math.max(0, cafe.tags.length - 2);
  const visibleTags = cafe.tags.slice(0, 2);
  const hasKnownAmenity = cafe.wifi !== 'unknown' || cafe.charging !== 'unknown';

  return (
    <Link href={`/cafe/${cafe.id}`} asChild>
      <Pressable
        style={({ pressed }) => [styles.card, wide && styles.cardWide, pressed && styles.pressed]}
        accessibilityRole="link"
        accessibilityLabel={`${cafe.name}, ${cafe.neighborhood}`}
      >
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {cafe.name}
          </Text>
          {cafe.priceRange ? (
            <Text style={styles.price} numberOfLines={1}>
              {cafe.priceRange.split('(')[0].trim()}
            </Text>
          ) : null}
        </View>
        <Text style={styles.meta} numberOfLines={1}>
          {cafe.neighborhood}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {cafe.description}
        </Text>
        {hasKnownAmenity || visibleTags.length > 0 ? (
          <View style={styles.chips}>
            <AmenityChip label="Wifi" status={cafe.wifi} compact hideUnknown />
            <AmenityChip label="Charging" status={cafe.charging} compact hideUnknown />
            {visibleTags.map((tag) => (
              <Text key={tag} style={styles.tag} numberOfLines={1}>
                {tag}
              </Text>
            ))}
            {extraTags > 0 ? <Text style={styles.more}>+{extraTags}</Text> : null}
          </View>
        ) : null}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgElevated,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  cardWide: {
    flex: 1,
    minWidth: 260,
    maxWidth: '100%',
  },
  pressed: {
    opacity: 0.92,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: spacing.sm,
  },
  name: {
    ...typography.subtitle,
    color: colors.text,
    flex: 1,
  },
  price: {
    ...typography.caption,
    color: colors.accent,
    fontWeight: '600',
    flexShrink: 0,
  },
  meta: {
    ...typography.label,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  description: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  tag: {
    ...typography.label,
    color: colors.textMuted,
    backgroundColor: colors.bgMuted,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radius.pill,
    maxWidth: 140,
    overflow: 'hidden',
  },
  more: {
    ...typography.label,
    color: colors.textMuted,
  },
});
