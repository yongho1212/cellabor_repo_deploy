"use client"
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TextStyle } from 'react-native';

interface TagProps {
    text: string;
    isSelected: boolean;
    disable: boolean;
    onClick?: () => void;
}

const getTextStyle = (isSelected: boolean, disable: boolean): TextStyle => ({
    color: isSelected ? '#F2004D' : '#94999E',
    opacity: disable ? 0.6 : 1,
});

const styles = StyleSheet.create({
    tagButton: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 10,
        borderRadius: 30,
        borderWidth: 1,
    },
    selected: {
        borderColor: '#FFE4EA',
        backgroundColor: '#FFE4EA',
    },
    unselected: {
        borderColor: '#94999E',
        backgroundColor: '#FFF',
    },
    disabled: {
        backgroundColor: '#e0e0e0',
        opacity: 0.6,
    },
});

const TagItem: React.FC<TagProps> = ({ text, isSelected, disable, onClick }) => {
    const tagStyle = [
        styles.tagButton,
        isSelected ? styles.selected : styles.unselected,
        disable && styles.disabled,
    ];

    return (
        <TouchableOpacity
            style={tagStyle}
            disabled={disable}
            onPress={onClick}
        >
            <Text style={getTextStyle(isSelected, disable)}>{text}</Text>
        </TouchableOpacity>
    );
};

export default TagItem;
