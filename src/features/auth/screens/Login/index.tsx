import { theme } from '@app/theme';
import { useNavigation } from '@react-navigation/native';
import GradientBox from '@shared/components/layout/GradientBox';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Spacer from '@shared/components/layout/Spacer';
import Loader from '@shared/components/Loader';
import Text from '@shared/components/Text';
import TextField from '@shared/components/TextField';
import { normalize } from '@shared/helpers/normalize-pixels';
import { useAuth } from '@shared/contexts/AuthContext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LoginButton, LogoImage } from './styles';

export default function Login() {
  const { t } = useTranslation('login');
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthData, joinAsGuest } = useAuth();

  return (
    <SafeAreaBox flex={1} bg="bg_primary">
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
                setAuthData({ email });
                navigation.navigate('LoginPassword', {
                  email,
                });
              }, 1500);
            }}>
            <Text variant="button_label">{t('login')}</Text>
          </LoginButton>

          <Spacer height={50} />

          <Text
            style={{ textDecorationLine: 'underline', alignSelf: 'flex-start' }}
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            {t('create_account')}
          </Text>

          <Spacer height={15} />
          <Text
            style={{
              textDecorationLine: 'underline',
              alignSelf: 'flex-start',
            }}
            onPress={() => {
              //TODO: Add navigation to home page
              console.log('Join As Guest');

              setIsLoading(true);

              setTimeout(() => {
                setIsLoading(false);
                joinAsGuest();
              }, 1500);
            }}>
            {t('join_as_guest')}
          </Text>
        </GradientBox>
      </KeyboardAwareScrollView>
    </SafeAreaBox>
  );
}
