import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Link } from 'expo-router';
import type { Cafe } from '@/types/cafe';
import { AmenityChip } from './AmenityChip';
import { radius, spacing, typography } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/useThemeColors';

type Props = {
  cafe: Cafe;
};

export function CafeCard({ cafe }: Props) {
  const { width } = useWindowDimensions();
  const wide = width >= 720;
  const extraTags = Math.max(0, cafe.tags.length - 2);
  const visibleTags = cafe.tags.slice(0, 2);
  const hasKnownAmenity = cafe.wifi !== 'unknown' || cafe.charging !== 'unknown';

  const styles = useThemedStyles((colors) =>
    StyleSheet.create({
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
      name: {
        ...typography.subtitle,
        color: colors.text,
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
    })
  );

  return (
    <Link href={`/cafe/${cafe.id}`} asChild>
      <Pressable
        style={({ pressed }) => [pressed && styles.pressed]}
        accessibilityRole="link"
        accessibilityLabel={`${cafe.name}, ${cafe.neighborhood}`}
      >
        <View style={[styles.card, wide && styles.cardWide]}>
          <Text style={styles.name} numberOfLines={1}>
            {cafe.name}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {cafe.neighborhood}
            {cafe.priceRange ? `  ·  ${cafe.priceRange.split('(')[0].trim()}` : ''}
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
        </View>
      </Pressable>
    </Link>
  );
}
