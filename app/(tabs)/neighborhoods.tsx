import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Disclaimer } from '@/components/brewluru/Disclaimer';
import { neighborhoodStats, toNeighborhoodParam } from '@/data/cafes';
import { colors, radius, spacing, typography } from '@/constants/theme';

export default function NeighborhoodsScreen() {
  const stats = neighborhoodStats();

  return (
    <FlatList
      data={stats}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Browse by neighborhood</Text>
          <Text style={styles.subtitle}>
            {stats.length} areas in this curated Bengaluru set
          </Text>
        </View>
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
          <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
            <View style={styles.rowText}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.count}>
                {item.count} cafe{item.count === 1 ? '' : 's'}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    gap: spacing.sm,
  },
  header: { marginBottom: spacing.md, gap: spacing.xs },
  title: { ...typography.title, color: colors.text },
  subtitle: { ...typography.body, color: colors.textSecondary },
  row: {
    backgroundColor: colors.bgElevated,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  pressed: { opacity: 0.9 },
  rowText: { flex: 1, gap: 2, paddingRight: spacing.md },
  name: { ...typography.subtitle, color: colors.text },
  count: { ...typography.caption, color: colors.textMuted },
  chevron: { fontSize: 24, color: colors.textMuted, fontWeight: '300' },
  footer: { marginTop: spacing.lg },
});
