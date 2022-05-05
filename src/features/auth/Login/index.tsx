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
import { FacebookLogoImage, GoogleLogoImage, ImageWrapper, LoginButton, LogoImage } from './styles';

export default function LoginScreen() {
  const { t } = useTranslation('login');

  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar translucent backgroundColor={'transparent'} />

      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <Box mt="xlg" px="xlg" flex={1}>
          <LogoImage />

          <Spacer height={40} />

          <TextField placeholder={t('email_label')} />

          <Spacer height={20} />

          <LoginButton
            onPress={() => {
              //TODO: Add navigation to home page
              console.log('Login');
            }}>
            <Text variant="button_label">{t('login')}</Text>
          </LoginButton>

          <Spacer height={60} />

          <Box
            flexDirection="row"
            justifyContent="space-around"
            style={{ paddingHorizontal: normalize(50) }}>
            <ImageWrapper
              onPress={() => {
                //TODO: Implement google login
                console.log('Google Login');
              }}>
              <GoogleLogoImage />
            </ImageWrapper>

            <ImageWrapper
              onPress={() => {
                //TODO: Implement facebook login
                console.log('Facebook Login');
              }}>
              <FacebookLogoImage />
            </ImageWrapper>
          </Box>

          <Spacer height={60} />

          <Text
            style={{ textDecorationLine: 'underline' }}
            onPress={() => {
              //TODO: Add navigation to signup page
              console.log('Create Account');
            }}>
            {t('create_account')}
          </Text>

          <Spacer height={15} />
          <Text
            style={{ textDecorationLine: 'underline' }}
            onPress={() => {
              //TODO: Add navigation to home page
              console.log('Join As Guest');
            }}>
            {t('join_as_guest')}
          </Text>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaBox>
  );
}
