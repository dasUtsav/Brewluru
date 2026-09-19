import { StyleSheet, Text, View } from 'react-native';
import { DISCLAIMER } from '@/data/cafes';
import { colors, spacing, typography } from '@/constants/theme';

type Props = {
  quiet?: boolean;
};

export function Disclaimer({ quiet = true }: Props) {
  return (
    <View style={quiet ? styles.quiet : styles.box}>
      <Text style={styles.text}>{DISCLAIMER}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.bgMuted,
    borderRadius: 8,
    padding: spacing.md,
  },
  quiet: {
    paddingVertical: spacing.sm,
  },
  text: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
