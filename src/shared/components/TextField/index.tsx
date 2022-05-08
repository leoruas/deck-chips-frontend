import { theme } from '@app/theme';
import { normalize } from '@shared/helpers/normalize-pixels';
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { TextInputWrapper } from './styles';

export default function TextField({ ...props }: TextInputProps) {
  return (
    <TextInputWrapper>
      <TextInput
        placeholderTextColor={theme.colors.text_default}
        style={{
          fontSize: normalize(27),
          color: theme.colors.text_default,
          fontFamily: 'Univers-Condensed',
          letterSpacing: normalize(1),
        }}
        {...props}
      />
    </TextInputWrapper>
  );
}
