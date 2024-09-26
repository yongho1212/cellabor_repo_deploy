import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {ButtonTypes} from '../../types/uiComponentsTypes';

const NativeButton = ({ props, children }:ButtonTypes) => (
    <TouchableOpacity style={styles.button} {...props}>
        <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        color: 'white',
    },
});

export default NativeButton;
