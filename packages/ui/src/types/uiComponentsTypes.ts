import {commonStyles} from '../styles/commonStyles';
import {TextStyle} from 'react-native'

export interface ButtonTypes {
    props: any;
    children: React.ReactNode;
}

export interface TypographyTypes {
    variant: keyof typeof commonStyles;
    style?: TextStyle;
    children: React.ReactNode;
}
