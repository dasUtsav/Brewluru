import type { ReactNode } from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { AmenityChip } from '@/components/brewluru/AmenityChip';
import { Disclaimer } from '@/components/brewluru/Disclaimer';
import { EmptyState } from '@/components/brewluru/EmptyState';
import { TagChip } from '@/components/brewluru/TagChip';
import { cafes, getCafeById } from '@/data/cafes';
import { colors, radius, spacing, typography } from '@/constants/theme';

export function generateStaticParams() {
  return cafes.map((cafe) => ({ id: cafe.id }));
}

export default function CafeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const cafe = getCafeById(typeof id === 'string' ? id : id?.[0] ?? '');
  const router = useRouter();


  if (!cafe) {
    return (
      <View style={styles.missing}>
        <EmptyState
          title="Cafe not found"
          message="That cafe id is not in the Brewluru dataset."
        />
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: cafe.name }} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.name}>{cafe.name}</Text>
        <Text style={styles.neighborhood}>{cafe.neighborhood}</Text>
        {cafe.priceRange ? <Text style={styles.price}>{cafe.priceRange}</Text> : null}

        <View style={styles.chips}>
          <AmenityChip label="Wifi" status={cafe.wifi} />
          <AmenityChip label="Charging" status={cafe.charging} />
        </View>

        <Text style={styles.body}>{cafe.description}</Text>

        <Section title="Address">
          <Text style={styles.body}>{cafe.address || '—'}</Text>
        </Section>

        <Section title="Links">
          <View style={styles.linkRow}>
            {cafe.mapsUrl ? (
              <LinkButton label="Open in Maps" url={cafe.mapsUrl} />
            ) : (
              <Text style={styles.muted}>Maps link unavailable</Text>
            )}
            {cafe.website ? (
              <LinkButton label="Website" url={cafe.website} />
            ) : (
              <Text style={styles.muted}>Website unknown</Text>
            )}
          </View>
        </Section>

        <Section title="Seating">
          <Text style={styles.body}>{cafe.seating || '—'}</Text>
        </Section>

        <Section title="Coffee menu">
          <BulletList items={cafe.coffeeMenu} empty="No menu details recorded." />
        </Section>

        <Section title="Beans sold">
          <BulletList items={cafe.beansSold} empty="No retail bean details recorded." />
        </Section>

        <Section title="Sourcing">
          <Text style={styles.body}>{cafe.sourcing || '—'}</Text>
        </Section>

        <Section title="Tags">
          <View style={styles.tagWrap}>
            {cafe.tags.length === 0 ? (
              <Text style={styles.muted}>No tags</Text>
            ) : (
              cafe.tags.map((t) => <TagChip key={t} label={t} />)
            )}
          </View>
        </Section>

        {(cafe.lat != null || cafe.lng != null) && (
          <Section title="Coordinates">
            <Text style={styles.body}>
              {cafe.lat ?? '—'}, {cafe.lng ?? '—'}
            </Text>
          </Section>
        )}

        {cafe.lat == null && cafe.lng == null ? (
          <Section title="Coordinates">
            <Text style={styles.muted}>Not verified — use Maps link for navigation.</Text>
          </Section>
        ) : null}

        <Section title="Confidence notes">
          <Text style={styles.body}>{cafe.confidenceNotes || '—'}</Text>
        </Section>

        <Section title="Sources">
          {cafe.sources.length === 0 ? (
            <Text style={styles.muted}>No sources listed</Text>
          ) : (
            cafe.sources.map((url) => (
              <Pressable key={url} onPress={() => Linking.openURL(url)} style={styles.source}>
                <Text style={styles.linkText}>{url}</Text>
              </Pressable>
            ))
          )}
        </Section>

        <Disclaimer />
      </ScrollView>
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function BulletList({ items, empty }: { items: string[]; empty: string }) {
  if (!items.length) return <Text style={styles.muted}>{empty}</Text>;
  return (
    <View style={styles.bullets}>
      {items.map((item) => (
        <Text key={item} style={styles.bullet}>
          • {item}
        </Text>
      ))}
    </View>
  );
}

function LinkButton({ label, url }: { label: string; url: string }) {
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

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    maxWidth: 800,
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
  name: { ...typography.hero, color: colors.text },
  neighborhood: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: -4,
  },
  price: { ...typography.subtitle, color: colors.accent },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  body: { ...typography.body, color: colors.textSecondary },
  muted: { ...typography.body, color: colors.textMuted },
  section: { gap: spacing.sm },
  sectionTitle: {
    ...typography.label,
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  linkRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  linkBtn: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  linkBtnText: { ...typography.label, color: colors.accentStrong },
  tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  bullets: { gap: 4 },
  bullet: { ...typography.body, color: colors.textSecondary },
  source: { paddingVertical: 4 },
  linkText: { ...typography.caption, color: colors.link },
});
