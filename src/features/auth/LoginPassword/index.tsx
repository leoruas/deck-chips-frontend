import { AuthStackParamList } from '@app/routes/Auth.routes';
import { theme } from '@app/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box } from '@shared/components/layout/Box';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Spacer from '@shared/components/layout/Spacer';
import Text from '@shared/components/Text';
import TextField from '@shared/components/TextField';
import { normalize } from '@shared/helpers/normalize-pixels';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LoginButton, LogoImage } from './styles';

export type LoginPasswordProps = {
  email: string;
};

type PageProps = NativeStackScreenProps<AuthStackParamList, 'LoginPassword'>;

export default function LoginPassword({ route }: PageProps) {
  const { t } = useTranslation('login_password');
  const { email } = route.params;

  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <Box mt="lg" px="xlg" pb="xlg" flex={1}>
          <Text fontSize={normalize(50)} textAlign="center">
            {t('deck_chips')}
          </Text>

          <Spacer height={15} />

          <LogoImage />

          <Spacer height={30} />

          <TextField value={email} editable={false} placeholder={t('email_label')} />

          <Spacer height={20} />

          <TextField placeholder={t('password_label')} />
          <Spacer height={20} />
          <Text
            style={{ textDecorationLine: 'underline' }}
            textAlign="right"
            onPress={() => {
              //TODO: Add navigation to home page
              console.log('Forgot Password');
            }}>
            {t('forgot_password')}
          </Text>

          <Spacer height={100} />

          <LoginButton
            onPress={() => {
              //TODO: Add navigation to home page
              console.log('Login');
            }}>
            <Text variant="button_label">{t('login')}</Text>
          </LoginButton>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaBox>
  );
}
