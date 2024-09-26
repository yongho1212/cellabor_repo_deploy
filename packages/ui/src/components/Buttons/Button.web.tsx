// packages/ui/src/components/Button/Button.web.js
"use client"
import React from 'react';
import styled from 'styled-components';
import {ButtonTypes} from '../../types/uiComponentsTypes';
import {TouchableOpacity} from 'react-native';

const StyledButton = styled.button`
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
`;

const WebButton = ({ props, children }:ButtonTypes) => (
    <StyledButton {...props}>{children},WEB</StyledButton>
);

export default WebButton;
