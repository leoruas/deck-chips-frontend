import { theme } from '@app/theme';
import CardsList from '@shared/components/CardsList';
import { Box } from '@shared/components/layout/Box';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import Spacer from '@shared/components/layout/Spacer';
import SearchBar from '@shared/components/SearchBar';
import Text from '@shared/components/Text';
import React from 'react';
import { StatusBar } from 'react-native';
import { BottomBarTextButton, BottomBarWrapper, SaveButtonWrapper } from './styles';
import SaveIcon from '@assets/icons/save.svg';
import { normalize } from '@shared/helpers/normalize-pixels';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

export default function EditDeck() {
  const { t } = useTranslation('edit_deck');
  const navigation = useNavigation();

  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <Box flex={1} px="md">
        <SearchBar rightButtons={['deck_cover', 'filters']} />

        <Spacer height={12} />

        <CardsList showCardAmount />
      </Box>

      <BottomBarWrapper>
        <BottomBarTextButton
          onPress={() => {
            //TODO: add navigation to deck cards
            console.log('Cards');
          }}>
          <Text numberOfLines={1}>{t('cards')}</Text>
        </BottomBarTextButton>
        <SaveButtonWrapper
          onPress={() => {
            //TODO: add save deck
            console.log('Save');
            navigation.goBack();
          }}>
          <SaveIcon width={normalize(50)} height={normalize(50)} fill={theme.colors.text_default} />
        </SaveButtonWrapper>
        <BottomBarTextButton
          onPress={() => {
            navigation.navigate('DeckInfo');
          }}>
          <Text numberOfLines={1}>{t('info')}</Text>
        </BottomBarTextButton>
      </BottomBarWrapper>
    </SafeAreaBox>
  );
}
