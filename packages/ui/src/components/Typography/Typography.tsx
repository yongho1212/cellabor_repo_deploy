"use client"
import React from 'react';
import { Text } from 'react-native';
import {TypographyTypes} from '../../types/uiComponentsTypes';
import {commonStyles} from '../../styles/commonStyles';



const Typography: React.FC<TypographyTypes> = ({ variant, style, children, ...props }) => (
    <Text style={[commonStyles[variant!], style]} {...props}>
        {children}
    </Text>
);



export default Typography;
