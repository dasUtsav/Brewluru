import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Text } from 'react-native';
import { colors } from '@/constants/theme';

function TabIcon({
  ios,
  material,
  focused,
  fallback,
}: {
  ios: `${string}`;
  material: `${string}`;
  focused: boolean;
  fallback: string;
}) {
  const tint = focused ? colors.accent : colors.textMuted;
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
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700', fontSize: 17 },
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarStyle: {
          backgroundColor: colors.bgElevated,
          borderTopColor: colors.border,
        },
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarLabel: 'Explore',
          tabBarIcon: ({ focused }) => (
            <TabIcon ios="cup.and.saucer.fill" material="local_cafe" focused={focused} fallback="☕" />
          ),
        }}
      />
      <Tabs.Screen
        name="neighborhoods"
        options={{
          title: 'Areas',
          tabBarLabel: 'Areas',
          tabBarIcon: ({ focused }) => (
            <TabIcon ios="map" material="map" focused={focused} fallback="⌖" />
          ),
        }}
      />
      <Tabs.Screen
        name="work"
        options={{
          title: 'Work',
          tabBarLabel: 'Work',
          tabBarIcon: ({ focused }) => (
            <TabIcon ios="laptopcomputer" material="laptop" focused={focused} fallback="💻" />
          ),
        }}
      />
    </Tabs>
  );
}
