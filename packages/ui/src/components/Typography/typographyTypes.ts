import { TextStyle } from 'react-native';
import { colors } from '../../../../design-system/design-tokens';

type TypographyVariant =
    'ptd_b_32' | 'ptd_b_26' | 'ptd_b_24' | 'ptd_b_20' | 'ptd_b_18' | 'ptd_b_16' | 'ptd_b_14' | 'ptd_b_12' |
    'ptd_m_32' | 'ptd_m_26' | 'ptd_m_24' | 'ptd_m_20' | 'ptd_m_18' | 'ptd_m_16' | 'ptd_m_14' | 'ptd_m_12' |
    'ptd_r_32' | 'ptd_r_26' | 'ptd_r_24' | 'ptd_r_20' | 'ptd_r_18' | 'ptd_r_16' | 'ptd_r_14' | 'ptd_r_12';

export interface TypographyProps {
    variant: TypographyVariant;
    style?: TextStyle;
    color?: keyof typeof colors;
    children: React.ReactNode;
    as?: React.ElementType;
    [key: string]: any;
}

const getFontWeight = (weight: string): TextStyle['fontWeight'] => {
    switch (weight) {
        case 'b': return '700';
        case 'm': return '500';
        case 'r': return '400';
        default: return '400';
    }
};

const getLineHeight = (size: string): number => {
    const sizeNum = parseInt(size);
    switch (sizeNum) {
        case 32: return 36;
        case 26: return 32;
        case 24: return 28;
        case 20: return 24;
        case 18: return 24;
        case 16: return 20;
        case 14: return 20;
        case 12: return 16;
        default: return Math.round(sizeNum * 1.2); // 기본값으로 1.2배 사용
    }
};

export const getStyleForVariant = (variant: TypographyVariant): TextStyle => {
    const [, weight, size] = variant.split('_') as [string, string, string];
    return {
        fontFamily: 'Pretendard',
        fontSize: parseInt(size),
        fontWeight: getFontWeight(weight),
        lineHeight: getLineHeight(size),
    };
};
