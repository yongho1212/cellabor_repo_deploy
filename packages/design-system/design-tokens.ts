export const colors = {
    pink_100: '#FFE4EA',
    pink_200: '#FD8CA5',
    pink_300: '#FA5C81',
    pink_400: '#F73567',
    pink_500: '#F2004D',
    primary: '#F2004D',
    pink_600: '#E2004C',
    white: '#FFFFFF',
    grey_100: '#F2F3F5',
    grey_200: '#D2D4D7',
    grey_300: '#B5B9BE',
    grey_400: '#94999E',
    grey_500: '#6B6F76',
    primary_grey: '#6B6F76',
    black: '#1A1B1C'
} as const;

export const typographies = {
    fontFamily: "'Pretendard', sans-serif",
    fontSize: {
        '3xl': 32,
        '2xl': 26,
        'xl': 24,
        'lg': 20,
        'md': 18,
        'sm': 16,
        'xs': 14,
        '2xs': 12,
    },
    fontWeight: {
        regular: '400' as const,
        medium: '500' as const,
        bold: '700' as const,
    },
    letterSpacing: 0,
} as const;













export const spacing = {
    small: '8px',
    medium: '16px',
    large: '24px',
};

export const typography = {
    fontFamily: "'Inter', sans-serif",
    fontSize: {
        small: '12px',
        medium: '16px',
        large: '24px',
    },
    fontWeight: {
        normal: '400',
        bold: '700',
    },
};
