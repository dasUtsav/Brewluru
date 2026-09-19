import { StyleSheet, Text, View } from 'react-native';
import type { AmenityStatus } from '@/types/cafe';
import { radius, typography } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/useThemeColors';

type Props = {
  label: string;
  status: AmenityStatus;
  compact?: boolean;
  /** List cards: skip unknown so empty amenity data does not add chips. */
  hideUnknown?: boolean;
};

export function AmenityChip({ label, status, compact, hideUnknown }: Props) {
  const styles = useThemedStyles((colors) =>
    StyleSheet.create({
      chip: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: radius.pill,
        alignSelf: 'flex-start',
      },
      compact: {
        paddingHorizontal: 7,
        paddingVertical: 2,
      },
      yes: { backgroundColor: colors.successSoft },
      no: { backgroundColor: colors.dangerSoft },
      unknown: { backgroundColor: colors.bgMuted },
      label: { ...typography.label, letterSpacing: 0.2 },
      yesText: { color: colors.success },
      noText: { color: colors.danger },
      unknownText: { color: colors.textMuted },
    })
  );

  if (hideUnknown && status === 'unknown') return null;

  const tone =
    status === 'yes' ? styles.yes : status === 'no' ? styles.no : styles.unknown;
  const textTone =
    status === 'yes' ? styles.yesText : status === 'no' ? styles.noText : styles.unknownText;

  const text =
    status === 'yes'
      ? label
      : status === 'no'
        ? `No ${label.toLowerCase()}`
        : `${label}?`;

  return (
    <View style={[styles.chip, tone, compact && styles.compact]}>
      <Text style={[styles.label, textTone]}>{text}</Text>
    </View>
  );
}
