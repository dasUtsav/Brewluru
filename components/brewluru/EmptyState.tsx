import { StyleSheet, Text, View } from 'react-native';
import { spacing, typography } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/useThemeColors';

type Props = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: Props) {
  const styles = useThemedStyles((colors) =>
    StyleSheet.create({
      wrap: {
        alignItems: 'center',
        paddingVertical: spacing.xxl,
        paddingHorizontal: spacing.xl,
        gap: spacing.sm,
      },
      title: { ...typography.subtitle, color: colors.text, textAlign: 'center' },
      message: { ...typography.body, color: colors.textMuted, textAlign: 'center', maxWidth: 360 },
    })
  );

  return (
    <View style={styles.wrap} accessibilityRole="summary">
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
