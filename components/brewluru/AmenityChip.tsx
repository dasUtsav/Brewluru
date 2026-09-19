import { StyleSheet, Text, View } from 'react-native';
import type { AmenityStatus } from '@/types/cafe';
import { colors, radius, typography } from '@/constants/theme';

type Props = {
  label: string;
  status: AmenityStatus;
  compact?: boolean;
};

export function AmenityChip({ label, status, compact }: Props) {
  const tone =
    status === 'yes' ? styles.yes : status === 'no' ? styles.no : styles.unknown;
  const textTone =
    status === 'yes' ? styles.yesText : status === 'no' ? styles.noText : styles.unknownText;
  const statusLabel = status === 'yes' ? 'Yes' : status === 'no' ? 'No' : 'Unknown';

  return (
    <View style={[styles.chip, tone, compact && styles.compact]}>
      <Text style={[styles.label, textTone]}>
        {label}: {statusLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  compact: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  yes: { backgroundColor: colors.successSoft },
  no: { backgroundColor: colors.dangerSoft },
  unknown: { backgroundColor: colors.warningSoft },
  label: { ...typography.label },
  yesText: { color: colors.success },
  noText: { color: colors.danger },
  unknownText: { color: colors.warning },
});
