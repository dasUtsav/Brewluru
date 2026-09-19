export type ThemeColors = {
  bg: string;
  bgElevated: string;
  bgMuted: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  accent: string;
  accentSoft: string;
  accentStrong: string;
  success: string;
  successSoft: string;
  warning: string;
  warningSoft: string;
  danger: string;
  dangerSoft: string;
  chip: string;
  chipActive: string;
  chipActiveText: string;
  link: string;
  shadow: string;
  overlay: string;
};

export const lightColors: ThemeColors = {
  bg: '#F7F3EE',
  bgElevated: '#FFFFFF',
  bgMuted: '#EFE8DF',
  text: '#1C1410',
  textSecondary: '#5C4E44',
  textMuted: '#8A7A6E',
  border: '#E4D9CE',
  accent: '#6B3F2A',
  accentSoft: '#F0E2D6',
  accentStrong: '#4A2A1A',
  success: '#2F6B4F',
  successSoft: '#E3F0EA',
  warning: '#9A6B1F',
  warningSoft: '#F7EDD9',
  danger: '#8B3A2F',
  dangerSoft: '#F5E4E1',
  chip: '#EDE4DA',
  chipActive: '#6B3F2A',
  chipActiveText: '#FFF8F2',
  link: '#2F5D8C',
  shadow: 'rgba(28, 20, 16, 0.06)',
  overlay: 'rgba(28, 20, 16, 0.4)',
};

/** Warm espresso palette for dark mode */
export const darkColors: ThemeColors = {
  bg: '#14100E',
  bgElevated: '#1E1814',
  bgMuted: '#2A221C',
  text: '#F5EDE6',
  textSecondary: '#C4B5A8',
  textMuted: '#8E7D70',
  border: '#3A302A',
  accent: '#D4A574',
  accentSoft: '#3D2E22',
  accentStrong: '#E8C9A8',
  success: '#6BB896',
  successSoft: '#1E2E26',
  warning: '#D4A84A',
  warningSoft: '#2E2618',
  danger: '#E08A7A',
  dangerSoft: '#2E1E1A',
  chip: '#2A221C',
  chipActive: '#D4A574',
  chipActiveText: '#1A120C',
  link: '#7EB3E0',
  shadow: 'rgba(0, 0, 0, 0.35)',
  overlay: 'rgba(0, 0, 0, 0.55)',
};

/** @deprecated Use useThemeColors() for theme-aware UI */
export const colors = lightColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
};

export const typography = {
  hero: { fontSize: 26, fontWeight: '700' as const, letterSpacing: -0.4 },
  title: { fontSize: 20, fontWeight: '700' as const, letterSpacing: -0.2 },
  subtitle: { fontSize: 16, fontWeight: '600' as const, letterSpacing: -0.1 },
  body: { fontSize: 15, fontWeight: '400' as const, lineHeight: 21 },
  caption: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18 },
  label: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 0.4 },
};
