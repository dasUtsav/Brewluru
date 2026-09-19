import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { spacing, typography } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/useThemeColors';

export default function NotFoundScreen() {
  const styles = useThemedStyles((colors) =>
    StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
        backgroundColor: colors.bg,
      },
      title: {
        ...typography.title,
        color: colors.text,
      },
      link: {
        marginTop: spacing.lg,
        paddingVertical: spacing.md,
      },
      linkText: {
        ...typography.body,
        color: colors.link,
        fontWeight: '600',
      },
    })
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn’t exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Back to Brewluru home</Text>
        </Link>
      </View>
    </>
  );
}
