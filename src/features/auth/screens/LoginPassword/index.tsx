import { AuthStackParamList } from '@app/routes/Auth.routes';
import { theme } from '@app/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box } from '@shared/components/layout/Box';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Spacer from '@shared/components/layout/Spacer';
import Text from '@shared/components/Text';
import TextField from '@shared/components/TextField';
import { normalize } from '@shared/helpers/normalize-pixels';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBar, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LoginButton, LogoImage } from './styles';
import ChevronLeftIcon from '@assets/icons/chevron-left.svg';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@shared/contexts/AuthContext';
import Loader from '@shared/components/Loader';
import GradientBox from '@shared/components/layout/GradientBox';

export type LoginPasswordProps = {
  email: string;
};

type PageProps = NativeStackScreenProps<AuthStackParamList, 'LoginPassword'>;

export default function LoginPassword({ route }: PageProps) {
  const { t } = useTranslation('login_password');
  const navigation = useNavigation();
  const { email } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn } = useAuth();

  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />
      <Loader showLoader={isLoading} />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <GradientBox px="xlg" pb="xlg">
          <Box flex={1} flexDirection="row" alignItems="center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeftIcon
                width={normalize(50)}
                height={normalize(50)}
                fill={theme.colors.text_default}
              />
            </TouchableOpacity>
            <Text
              style={{ flex: 1, marginRight: normalize(50) }}
              textAlign="center"
              fontSize={normalize(50)}>
              {t('deck_chips')}
            </Text>
          </Box>

          <Spacer height={15} />

          <LogoImage />

          <Spacer height={30} />

          <TextField value={email} editable={false} />

          <Spacer height={20} />

          <TextField secureTextEntry placeholder={t('password_label')} />
          <Spacer height={20} />
          <Text
            style={{ textDecorationLine: 'underline', alignSelf: 'flex-end' }}
            onPress={() => {
              //TODO: Add forgot password
              console.log('Forgot Password');
            }}>
            {t('forgot_password')}
          </Text>

          <Spacer height={100} />

          <LoginButton
            onPress={() => {
              //TODO: Implement login
              setIsLoading(true);

              setTimeout(() => {
                setIsLoading(false);
                setIsLoggedIn(true);
                navigation.navigate('Home');
              }, 1500);
            }}>
            <Text variant="button_label">{t('login')}</Text>
          </LoginButton>
        </GradientBox>
      </KeyboardAwareScrollView>
    </SafeAreaBox>
  );
}
