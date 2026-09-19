import { StyleSheet, Text, View } from 'react-native';
import { DISCLAIMER } from '@/data/cafes';
import { colors, radius, spacing, typography } from '@/constants/theme';

export function Disclaimer() {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{DISCLAIMER}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.bgMuted,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
