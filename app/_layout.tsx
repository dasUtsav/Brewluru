import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo } from 'react';
import { Platform, useColorScheme } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Analytics } from '@vercel/analytics/react';
import { useThemeColors } from '@/hooks/useThemeColors';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colors = useThemeColors();
  const scheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const screenOptions = useMemo(
    () => ({
      headerStyle: { backgroundColor: colors.bg },
      headerTintColor: colors.accentStrong,
      headerTitleStyle: { fontWeight: '700' as const, color: colors.text },
      headerShadowVisible: false,
      contentStyle: { backgroundColor: colors.bg },
    }),
    [colors]
  );

  return (
    <>
      {Platform.OS === 'web' ? <Analytics /> : null}
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="cafe/[id]" options={{ title: 'Cafe', headerBackTitle: 'Back' }} />
        <Stack.Screen
          name="neighborhood/[name]"
          options={{ title: 'Neighborhood', headerBackTitle: 'Back' }}
        />
      </Stack>
    </>
  );
}
