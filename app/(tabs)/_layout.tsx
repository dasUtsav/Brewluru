import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { colors } from '@/constants/theme';

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 16, opacity: focused ? 1 : 0.55 }} accessibilityElementsHidden>
      {label}
    </Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
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
          title: 'Cafes',
          tabBarLabel: 'Explore',
          tabBarIcon: ({ focused }) => <TabIcon label="☕" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="neighborhoods"
        options={{
          title: 'Neighborhoods',
          tabBarLabel: 'Areas',
          tabBarIcon: ({ focused }) => <TabIcon label="📍" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="work"
        options={{
          title: 'Work-friendly',
          tabBarLabel: 'Work',
          tabBarIcon: ({ focused }) => <TabIcon label="💻" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
