import type { ReactNode } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { AmenityChip } from '@/components/brewluru/AmenityChip';
import { Collapsible } from '@/components/brewluru/Collapsible';
import { Disclaimer } from '@/components/brewluru/Disclaimer';
import { EmptyState } from '@/components/brewluru/EmptyState';
import { TagChip } from '@/components/brewluru/TagChip';
import { cafes, getCafeById } from '@/data/cafes';
import { radius, spacing, typography } from '@/constants/theme';
import type { ThemeColors } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/useThemeColors';

export function generateStaticParams() {
  return cafes.map((cafe) => ({ id: cafe.id }));
}

function createDetailStyles(colors: ThemeColors) {
  return StyleSheet.create({
    content: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.xxl,
      maxWidth: 720,
      width: '100%',
      alignSelf: 'center',
      gap: spacing.md,
    },
    missing: { flex: 1, padding: spacing.xl, justifyContent: 'center' },
    backBtn: {
      alignSelf: 'center',
      marginTop: spacing.lg,
      backgroundColor: colors.accent,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: radius.pill,
    },
    backBtnText: { color: colors.chipActiveText, fontWeight: '600' },
    hero: { gap: 4 },
    name: { ...typography.hero, color: colors.text },
    meta: {
      ...typography.caption,
      color: colors.textMuted,
      fontWeight: '600',
    },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    body: { ...typography.body, color: colors.textSecondary },
    muted: { ...typography.caption, color: colors.textMuted },
    section: { gap: 6 },
    sectionTitle: {
      ...typography.label,
      color: colors.textMuted,
      textTransform: 'uppercase',
    },
    linkRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: 4 },
    linkBtn: {
      backgroundColor: colors.accentSoft,
      paddingHorizontal: spacing.md,
      paddingVertical: 6,
      borderRadius: radius.pill,
    },
    linkBtnText: { ...typography.label, color: colors.accentStrong },
    chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    source: { paddingVertical: 2 },
    linkText: { ...typography.caption, color: colors.link },
  });
}

type DetailStyles = ReturnType<typeof createDetailStyles>;

export default function CafeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const cafe = getCafeById(typeof id === 'string' ? id : id?.[0] ?? '');
  const router = useRouter();
  const styles = useThemedStyles(createDetailStyles);

  if (!cafe) {
    return (
      <View style={styles.missing}>
        <EmptyState title="Cafe not found" message="That cafe id is not in the Brewluru dataset." />
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const price = cafe.priceRange ? cafe.priceRange.split('(')[0].trim() : null;
  const meta = [cafe.neighborhood, price].filter(Boolean).join('  ·  ');
  const hasLinks = Boolean(cafe.mapsUrl || cafe.website);
  const hasCoords = cafe.lat != null || cafe.lng != null;

  return (
    <>
      <Stack.Screen options={{ title: cafe.name }} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.name}>{cafe.name}</Text>
          <Text style={styles.meta}>{meta}</Text>
        </View>

        <View style={styles.chips}>
          <AmenityChip label="Wifi" status={cafe.wifi} compact />
          <AmenityChip label="Charging" status={cafe.charging} compact />
        </View>

        <Text style={styles.body}>{cafe.description}</Text>

        {cafe.address || hasLinks ? (
          <Section title="Address" styles={styles}>
            {cafe.address ? <Text style={styles.body}>{cafe.address}</Text> : null}
            {hasLinks ? (
              <View style={styles.linkRow}>
                {cafe.mapsUrl ? <LinkButton label="Maps" url={cafe.mapsUrl} styles={styles} /> : null}
                {cafe.website ? <LinkButton label="Website" url={cafe.website} styles={styles} /> : null}
              </View>
            ) : null}
          </Section>
        ) : null}

        {cafe.seating ? (
          <Section title="Seating" styles={styles}>
            <Text style={styles.body}>{cafe.seating}</Text>
          </Section>
        ) : null}

        {cafe.coffeeMenu.length > 0 ? (
          <Section title="Coffee" styles={styles}>
            <View style={styles.chipWrap}>
              {cafe.coffeeMenu.map((item) => (
                <TagChip key={item} label={item} compact />
              ))}
            </View>
          </Section>
        ) : null}

        {cafe.beansSold.length > 0 ? (
          <Section title="Beans" styles={styles}>
            <View style={styles.chipWrap}>
              {cafe.beansSold.map((item) => (
                <TagChip key={item} label={item} compact />
              ))}
            </View>
          </Section>
        ) : null}

        {cafe.sourcing ? (
          <Section title="Sourcing" styles={styles}>
            <Text style={styles.body}>{cafe.sourcing}</Text>
          </Section>
        ) : null}

        {cafe.tags.length > 0 ? (
          <View style={styles.chipWrap}>
            {cafe.tags.map((t) => (
              <TagChip key={t} label={t} compact />
            ))}
          </View>
        ) : null}

        <Collapsible title="Notes & sources">
          {cafe.confidenceNotes ? <Text style={styles.body}>{cafe.confidenceNotes}</Text> : null}
          {hasCoords ? (
            <Text style={styles.muted}>
              {cafe.lat ?? '—'}, {cafe.lng ?? '—'}
            </Text>
          ) : null}
          {cafe.sources.length > 0
            ? cafe.sources.map((url) => (
                <Pressable key={url} onPress={() => Linking.openURL(url)} style={styles.source}>
                  <Text style={styles.linkText}>{url}</Text>
                </Pressable>
              ))
            : null}
          <Disclaimer />
        </Collapsible>
      </ScrollView>
    </>
  );
}

function Section({
  title,
  children,
  styles,
}: {
  title: string;
  children: ReactNode;
  styles: DetailStyles;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function LinkButton({
  label,
  url,
  styles,
}: {
  label: string;
  url: string;
  styles: DetailStyles;
}) {
  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      style={({ pressed }) => [styles.linkBtn, pressed && { opacity: 0.85 }]}
      accessibilityRole="link"
    >
      <Text style={styles.linkBtnText}>{label}</Text>
    </Pressable>
  );
}
