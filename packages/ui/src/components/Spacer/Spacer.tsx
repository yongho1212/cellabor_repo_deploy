'use client'
import React from 'react';
import {View} from 'react-native';

interface SpacerProps {
    width?: number;
    height?: number;
}

const Spacer: React.FC<SpacerProps> = ({width, height, ...props}) => {

    return (
        <View style={{
            width: width,
            height: height,
            ...props
        }}/>
    );
};

export default Spacer;
