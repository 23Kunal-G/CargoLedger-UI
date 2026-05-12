/**
 * Design System - Typography Tokens
 * All font sizes, weights, and line heights
 * Single source of truth for typography consistency
 */

export const typography = {
  // Font Family
  fontFamily: {
    sans: 'var(--font-inter)',
    mono: 'var(--font-mono)',
  },

  // Font Sizes & Line Heights
  sizes: {
    // Display / Hero
    display1: {
      fontSize: '2rem', // 32px
      lineHeight: '2.5rem', // 40px
      fontWeight: '700',
      letterSpacing: '-0.5px',
    },
    
    // Headings
    h1: {
      fontSize: '1.875rem', // 30px
      lineHeight: '2.25rem', // 36px
      fontWeight: '700',
      letterSpacing: '-0.5px',
    },
    h2: {
      fontSize: '1.5rem', // 24px
      lineHeight: '2rem', // 32px
      fontWeight: '600',
      letterSpacing: '-0.5px',
    },
    h3: {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.75rem', // 28px
      fontWeight: '600',
      letterSpacing: '-0.25px',
    },
    h4: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.625rem', // 26px
      fontWeight: '600',
      letterSpacing: '0px',
    },
    
    // Body Text
    bodyLarge: {
      fontSize: '1rem', // 16px
      lineHeight: '1.5rem', // 24px
      fontWeight: '400',
      letterSpacing: '0px',
    },
    body: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.375rem', // 22px
      fontWeight: '400',
      letterSpacing: '0px',
    },
    bodySmall: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1.125rem', // 18px
      fontWeight: '400',
      letterSpacing: '0px',
    },
    
    // Labels
    label: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1rem', // 16px
      fontWeight: '600',
      letterSpacing: '0.5px',
    },
    labelSmall: {
      fontSize: '0.625rem', // 10px
      lineHeight: '0.875rem', // 14px
      fontWeight: '600',
      letterSpacing: '0.5px',
    },
    
    // Overline
    overline: {
      fontSize: '0.625rem', // 10px
      lineHeight: '0.875rem', // 14px
      fontWeight: '700',
      letterSpacing: '1px',
    },
  },

  // Font Weight
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line Height
  lineHeights: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
};

// Tailwind CSS config extension
export const tailwindTypography = {
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.375rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.625rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2rem', { lineHeight: '2.5rem' }],
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
};
