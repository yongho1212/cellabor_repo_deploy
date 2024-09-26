// packages/ui/src/components/Button/Button.js
"use client"
import React, { ButtonHTMLAttributes } from 'react';
import { Platform } from 'react-native';
import WebButton from './Button.web';
import NativeButton from './Button.native';
import {ButtonTypes} from '../../types/uiComponentsTypes'
import { Text } from 'react-native';


const Button = ({props, children}:ButtonTypes) => {
    if (Platform.OS === 'web') {
        return <WebButton {...props}>{children}</WebButton>;
    }
    return <NativeButton {...props} />;
};

export default Button;
