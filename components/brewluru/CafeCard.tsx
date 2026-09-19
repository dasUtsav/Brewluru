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

  return (
    <Link href={`/cafe/${cafe.id}`} asChild>
      <Pressable
        style={({ pressed }) => [styles.card, wide && styles.cardWide, pressed && styles.pressed]}
        accessibilityRole="link"
        accessibilityLabel={`${cafe.name}, ${cafe.neighborhood}`}
      >
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>
            {cafe.name}
          </Text>
          {cafe.priceRange ? (
            <Text style={styles.price} numberOfLines={1}>
              {cafe.priceRange.split('(')[0].trim()}
            </Text>
          ) : null}
        </View>
        <Text style={styles.neighborhood}>{cafe.neighborhood}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {cafe.description}
        </Text>
        <View style={styles.chips}>
          <AmenityChip label="Wifi" status={cafe.wifi} compact />
          <AmenityChip label="Charging" status={cafe.charging} compact />
        </View>
        {cafe.tags.length > 0 ? (
          <Text style={styles.tags} numberOfLines={1}>
            {cafe.tags.slice(0, 4).join(' · ')}
          </Text>
        ) : null}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgElevated,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardWide: {
    flex: 1,
    minWidth: 280,
    maxWidth: '100%',
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    maxWidth: 120,
    textAlign: 'right',
  },
  neighborhood: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  tags: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
});
