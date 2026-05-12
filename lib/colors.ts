/**
 * Design System - Color Tokens
 * All colors used throughout the application
 * Ensures consistency and easy theme management
 */

// Primary Brand Colors
export const colors = {
  // Primary Colors
  primary: {
    darkBlue: '#003D7A',
    lightBlue: '#1E5BA8',
    lighterBlue: '#2A7BBF',
  },
  
  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    lightBg: '#F8FAFB',
    lightGray: '#F3F4F6',
    mediumGray: '#E5E7EB',
    border: '#D1D5DB',
    secondaryText: '#6B7280',
    tertiaryText: '#9CA3AF',
    darkGray: '#1F2937',
  },
  
  // Semantic Status Colors
  status: {
    success: '#10B981',
    pending: '#F59E0B',
    cancelled: '#EF4444',
    warning: '#F97316',
    info: '#3B82F6',
  },
  
  // Interactive Colors
  interactive: {
    buttonPrimary: '#003D7A',
    buttonHover: '#1E5BA8',
    buttonDisabled: '#D1D5DB',
    link: '#2563EB',
    linkHover: '#1D4ED8',
  },
};

// Color by semantic meaning for easier usage
export const semanticColors = {
  background: colors.neutral.lightBg,
  surface: colors.neutral.white,
  text: {
    primary: colors.neutral.darkGray,
    secondary: colors.neutral.secondaryText,
    tertiary: colors.neutral.tertiaryText,
    inverse: colors.neutral.white,
  },
  border: colors.neutral.mediumGray,
  divider: colors.neutral.border,
  
  // Status specific
  success: colors.status.success,
  pending: colors.status.pending,
  error: colors.status.cancelled,
  warning: colors.status.warning,
  info: colors.status.info,
  
  // Actions
  primary: colors.primary.darkBlue,
  primaryHover: colors.primary.lightBlue,
  secondary: colors.neutral.lightGray,
  tertiary: colors.neutral.mediumGray,
};

// Export for Tailwind config
export const tailwindColors = {
  primary: colors.primary.darkBlue,
  'primary-light': colors.primary.lightBlue,
  'primary-lighter': colors.primary.lighterBlue,
  secondary: colors.status.pending,
  success: colors.status.success,
  warning: colors.status.warning,
  error: colors.status.cancelled,
  info: colors.status.info,
  neutral: {
    50: '#FAFAFA',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};
