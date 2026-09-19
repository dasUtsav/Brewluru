import { Pressable, StyleSheet, Text, View } from 'react-native';
import { radius, typography } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/useThemeColors';

type Props = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  compact?: boolean;
};

export function TagChip({ label, active, onPress, compact }: Props) {
  const styles = useThemedStyles((colors) =>
    StyleSheet.create({
      chip: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: radius.pill,
        backgroundColor: colors.chip,
        borderWidth: 1,
        borderColor: 'transparent',
      },
      compact: {
        paddingHorizontal: 8,
        paddingVertical: 3,
      },
      active: {
        backgroundColor: colors.chipActive,
        borderColor: colors.chipActive,
      },
      text: {
        ...typography.label,
        color: colors.textSecondary,
        letterSpacing: 0.15,
      },
      textCompact: {
        fontSize: 11,
      },
      activeText: {
        color: colors.chipActiveText,
      },
    })
  );

  const content = (
    <View style={[styles.chip, compact && styles.compact, active && styles.active]}>
      <Text style={[styles.text, compact && styles.textCompact, active && styles.activeText]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: !!active }}>
      {content}
    </Pressable>
  );
}
