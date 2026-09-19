import { StyleSheet, Text, View } from 'react-native';
import { DISCLAIMER } from '@/data/cafes';
import { spacing, typography } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/useThemeColors';

type Props = {
  quiet?: boolean;
};

export function Disclaimer({ quiet = true }: Props) {
  const styles = useThemedStyles((colors) =>
    StyleSheet.create({
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
    })
  );

  return (
    <View style={quiet ? styles.quiet : styles.box}>
      <Text style={styles.text}>{DISCLAIMER}</Text>
    </View>
  );
}
