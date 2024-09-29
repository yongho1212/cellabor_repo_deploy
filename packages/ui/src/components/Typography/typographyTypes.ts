import { TextStyle } from 'react-native';
import { colors, typographies } from '../../../../design-system/design-tokens';

type TypographyVariant = 'headline' | 'subheadline' | 'sectionTitle' | 'standardTitle' | 'subtitle' | 'body' | 'caption' | 'footnote';

export interface TypographyProps {
    variant: TypographyVariant;
    style?: TextStyle;
    color?: keyof typeof colors;
    children: React.ReactNode;
    [key: string]: any;
}

// !!TODO 수정필요
export const getStyleForVariant = (variant: TypographyVariant): TextStyle => {
    switch (variant) {
        case 'headline':
            return {
                fontSize: typographies.fontSize['3xl'],
                fontWeight: typographies.fontWeight.bold,
            };
        case 'subheadline':
            return {
                fontSize: typographies.fontSize['2xl'],
                fontWeight: typographies.fontWeight.bold,
            };
        case 'sectionTitle':
            return {
                fontSize: typographies.fontSize['xl'],
                fontWeight: typographies.fontWeight.bold,
            };
        case 'standardTitle':
            return {
                fontSize: typographies.fontSize['lg'],
                fontWeight: typographies.fontWeight.medium,
            };
        case 'subtitle':
            return {
                fontSize: typographies.fontSize['md'],
                fontWeight: typographies.fontWeight.medium,
            };
        case 'body':
            return {
                fontSize: typographies.fontSize['sm'],
                fontWeight: typographies.fontWeight.regular,
            };
        case 'caption':
            return {
                fontSize: typographies.fontSize['xs'],
                fontWeight: typographies.fontWeight.regular,
            };
        case 'footnote':
            return {
                fontSize: typographies.fontSize['2xs'],
                fontWeight: typographies.fontWeight.regular,
            };
    }
};
