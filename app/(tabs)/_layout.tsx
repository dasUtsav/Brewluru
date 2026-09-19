import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Text } from 'react-native';
import { useMemo } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';

function TabIcon({
  ios,
  material,
  focused,
  fallback,
  tint,
}: {
  ios: `${string}`;
  material: `${string}`;
  focused: boolean;
  fallback: string;
  tint: string;
}) {
  return (
    <SymbolView
      name={{ ios: ios as never, android: material as never, web: material as never }}
      size={22}
      tintColor={tint}
      fallback={
        <Text style={{ fontSize: 15, color: tint }} accessibilityElementsHidden>
          {fallback}
        </Text>
      }
    />
  );
}

export default function TabLayout() {
  const colors = useThemeColors();

  const screenOptions = useMemo(
    () => ({
      headerStyle: { backgroundColor: colors.bg },
      headerTintColor: colors.text,
      headerTitleStyle: { fontWeight: '700' as const, fontSize: 17 },
      headerShadowVisible: false,
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' as const },
      tabBarStyle: {
        backgroundColor: colors.bgElevated,
        borderTopColor: colors.border,
      },
      sceneStyle: { backgroundColor: colors.bg },
    }),
    [colors]
  );

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarLabel: 'Explore',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              ios="cup.and.saucer.fill"
              material="local_cafe"
              focused={focused}
              fallback="☕"
              tint={focused ? colors.accent : colors.textMuted}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="neighborhoods"
        options={{
          title: 'Areas',
          tabBarLabel: 'Areas',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              ios="map"
              material="map"
              focused={focused}
              fallback="⌖"
              tint={focused ? colors.accent : colors.textMuted}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="work"
        options={{
          title: 'Work',
          tabBarLabel: 'Work',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              ios="laptopcomputer"
              material="laptop"
              focused={focused}
              fallback="💻"
              tint={focused ? colors.accent : colors.textMuted}
            />
          ),
        }}
      />
    </Tabs>
  );
}
