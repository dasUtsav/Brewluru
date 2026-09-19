import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Disclaimer } from '@/components/brewluru/Disclaimer';
import { neighborhoodStats, toNeighborhoodParam } from '@/data/cafes';
import { radius, spacing, typography } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/useThemeColors';

export default function NeighborhoodsScreen() {
  const stats = neighborhoodStats();

  const styles = useThemedStyles((colors) =>
    StyleSheet.create({
      content: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.xxl,
        maxWidth: 800,
        width: '100%',
        alignSelf: 'center',
      },
      lede: {
        ...typography.caption,
        color: colors.textSecondary,
        marginBottom: spacing.md,
      },
      row: {
        backgroundColor: colors.bgElevated,
        borderRadius: radius.md,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
        gap: spacing.md,
      },
      pressed: { opacity: 0.9 },
      name: { ...typography.subtitle, color: colors.text, flex: 1 },
      count: { ...typography.caption, color: colors.textMuted, fontWeight: '600' },
      footer: { marginTop: spacing.md },
    })
  );

  return (
    <FlatList
      data={stats}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <Text style={styles.lede}>{stats.length} areas in this curated set</Text>
      }
      ListFooterComponent={
        <View style={styles.footer}>
          <Disclaimer />
        </View>
      }
      renderItem={({ item }) => (
        <Link
          href={{ pathname: '/neighborhood/[name]', params: { name: toNeighborhoodParam(item.name) } }}
          asChild
        >
          <Pressable
            style={({ pressed }) => [pressed && styles.pressed]}
            accessibilityRole="link"
            accessibilityLabel={`${item.name}, ${item.count} cafes`}
          >
            <View style={styles.row}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.count}>
                {item.count} cafe{item.count === 1 ? '' : 's'}
              </Text>
            </View>
          </Pressable>
        </Link>
      )}
    />
  );
}
