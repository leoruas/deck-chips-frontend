import { Box } from '@shared/components/layout/Box';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Spacer from '@shared/components/layout/Spacer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBar, TextInput } from 'react-native';
import { LogoSquare, TextInputWrapper } from './styles';

export default function LoginScreen() {
  const { t } = useTranslation('login');

  return (
    <SafeAreaBox flex={1}>
      <StatusBar translucent backgroundColor={'transparent'} />

      <Box mt="xlg">
        <LogoSquare />
      </Box>

      <Box mt="xlg" px="lg">
        <TextInputWrapper>
          <TextInput placeholder={t('email_label')} />
        </TextInputWrapper>

        <Spacer height={20} />

        <TextInputWrapper>
          <TextInput placeholder={t('password_label')} />
        </TextInputWrapper>
      </Box>
    </SafeAreaBox>
  );
}
