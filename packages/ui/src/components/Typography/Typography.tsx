"use client"
import React from 'react';
import { Text, TextStyle } from 'react-native';
import { colors, typographies } from '../../../../design-system/design-tokens'; // 경로는 실제 파일 위치에 맞게 조정해주세요
import {TypographyProps, getStyleForVariant} from './typographyTypes'

// type TypographyVariant = 'headline' | 'subheadline' | 'sectionTitle' | 'standardTitle' | 'subtitle' | 'body' | 'caption' | 'footnote';
//
// interface TypographyProps {
//     variant: TypographyVariant;
//     style?: TextStyle;
//     color?: keyof typeof colors;
//     children: React.ReactNode;
//     [key: string]: any;
// }

// const getStyleForVariant = (variant: TypographyVariant): TextStyle => {
//     switch (variant) {
//         case 'headline':
//             return {
//                 fontSize: typographies.fontSize['3xl'],
//                 fontWeight: typographies.fontWeight.bold,
//             };
//         case 'subheadline':
//             return {
//                 fontSize: typographies.fontSize['2xl'],
//                 fontWeight: typographies.fontWeight.bold,
//             };
//         case 'sectionTitle':
//             return {
//                 fontSize: typographies.fontSize['xl'],
//                 fontWeight: typographies.fontWeight.bold,
//             };
//         case 'standardTitle':
//             return {
//                 fontSize: typographies.fontSize['lg'],
//                 fontWeight: typographies.fontWeight.medium,
//             };
//         case 'subtitle':
//             return {
//                 fontSize: typographies.fontSize['md'],
//                 fontWeight: typographies.fontWeight.medium,
//             };
//         case 'body':
//             return {
//                 fontSize: typographies.fontSize['sm'],
//                 fontWeight: typographies.fontWeight.regular,
//             };
//         case 'caption':
//             return {
//                 fontSize: typographies.fontSize['xs'],
//                 fontWeight: typographies.fontWeight.regular,
//             };
//         case 'footnote':
//             return {
//                 fontSize: typographies.fontSize['2xs'],
//                 fontWeight: typographies.fontWeight.regular,
//             };
//     }
// };

const Typography: React.FC<TypographyProps> = ({ variant, style, color = 'black', children, ...props }) => {
    const variantStyle = getStyleForVariant(variant);
    const textColor = colors[color];

    return (
        <Text
            style={[
                {
                    fontFamily: typographies.fontFamily,
                    letterSpacing: typographies.letterSpacing,
                    color: textColor,
                },
                variantStyle,
                style
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};

export default Typography;
