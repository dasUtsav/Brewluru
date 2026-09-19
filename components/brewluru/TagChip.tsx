import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, typography } from '@/constants/theme';

type Props = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export function TagChip({ label, active, onPress }: Props) {
  const content = (
    <View style={[styles.chip, active && styles.active]}>
      <Text style={[styles.text, active && styles.activeText]} numberOfLines={1}>
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

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.chip,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  active: {
    backgroundColor: colors.chipActive,
    borderColor: colors.chipActive,
  },
  text: {
    ...typography.label,
    color: colors.textSecondary,
  },
  activeText: {
    color: colors.chipActiveText,
  },
});
