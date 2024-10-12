"use client"
import React from 'react';
import { Text as RNText, TextStyle, Platform, StyleSheet } from 'react-native';
import { colors } from '../../../../design-system/design-tokens';
import { TypographyProps, getStyleForVariant } from './typographyTypes';

const Typography: React.FC<TypographyProps & { as?: React.ElementType }> = ({
                                                                                variant,
                                                                                style,
                                                                                color = 'black',
                                                                                children,
                                                                                as,
                                                                                ...props
                                                                            }) => {
    const variantStyle = getStyleForVariant(variant);
    const textColor = colors[color];

    const combinedStyle = StyleSheet.flatten([
        variantStyle,
        { color: textColor },
        style
    ]);

    if (Platform.OS === 'web') {
        const webStyle = {
            ...combinedStyle,
            lineHeight: `${combinedStyle.lineHeight}px`
        };

        const Component = as || 'span';
        return (
            <Component style={webStyle} {...props}>
                {children}
            </Component>
        );
    }

    return (
        <RNText
            style={combinedStyle}
            {...props}
        >
            {children}
        </RNText>
    );
};

export default Typography;
