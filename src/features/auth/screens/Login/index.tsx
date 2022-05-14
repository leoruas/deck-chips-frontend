import { theme } from '@app/theme';
import { useNavigation } from '@react-navigation/native';
import { Box } from '@shared/components/layout/Box';
import GradientBox from '@shared/components/layout/GradientBox';
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
  const { t } = useTranslation('login');
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaBox flex={1}>
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <Loader showLoader={isLoading} />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <GradientBox px="xlg" pb="xlg">
          <Text fontSize={normalize(50)} textAlign="center">
            {t('deck_chips')}
          </Text>

          <Spacer height={15} />

          <LogoImage />

          <Spacer height={30} />

          <TextField value={email} onChangeText={setEmail} placeholder={t('email_label')} />

          <Spacer height={20} />

          <LoginButton
            onPress={() => {
              //TODO: implement email validation
              setIsLoading(true);

              setTimeout(() => {
                setIsLoading(false);
                if (!email.length) return;
                navigation.navigate('LoginPassword', {
                  email,
                });
              }, 1500);
            }}>
            <Text variant="button_label">{t('login')}</Text>
          </LoginButton>

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

          <Spacer height={50} />

          <Text
            style={{ textDecorationLine: 'underline' }}
            onPress={() => {
              navigation.navigate('SignUp');
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
        </GradientBox>
      </KeyboardAwareScrollView>
    </SafeAreaBox>
  );
}
