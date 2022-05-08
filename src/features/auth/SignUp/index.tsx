import { theme } from '@app/theme';
import { useNavigation } from '@react-navigation/native';
import { Box } from '@shared/components/layout/Box';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Spacer from '@shared/components/layout/Spacer';
import Loader from '@shared/components/Loader';
import Text from '@shared/components/Text';
import TextField from '@shared/components/TextField';
import { normalize } from '@shared/helpers/normalize-pixels';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FacebookLogoImage, GoogleLogoImage, ImageWrapper, LoginButton, LogoImage } from './styles';

export default function Login() {
  const { t } = useTranslation('signup');
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <Loader showLoader={isLoading} />

      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <Box mt="lg" px="xlg" pb="xlg" flex={1}>
          <Text fontSize={normalize(50)} textAlign="center">
            {t('deck_chips')}
          </Text>

          <Spacer height={15} />

          <LogoImage />

          <Spacer height={30} />

          <TextField value={email} onChangeText={setEmail} placeholder={t('email_label')} />

          <Spacer height={20} />

          <TextField value={email} onChangeText={setEmail} placeholder={t('password_label')} />

          <Spacer height={20} />

          <LoginButton
            onPress={() => {
              //TODO: implement signup endpoint
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                //TODO: navigate to home screen
                // navigation.navigate('Home');
              }, 1500);
            }}>
            <Text variant="button_label">{t('create_account')}</Text>
          </LoginButton>

          <Spacer height={20} />

          <Text
            style={{ textDecorationLine: 'underline' }}
            textAlign="right"
            onPress={() => {
              navigation.navigate('Login');
            }}>
            {t('already_have_account')}
          </Text>

          <Spacer height={50} />

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
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaBox>
  );
}
