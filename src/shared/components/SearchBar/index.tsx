import { theme } from '@app/theme';
import { normalize } from '@shared/helpers/normalize-pixels';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, TouchableOpacity } from 'react-native';
import { TextInputWrapper } from './styles';
import ChevronLeftIcon from '@assets/icons/chevron-left.svg';
import MenuIcon from '@assets/icons/menu.svg';
import CommunityIcon from '@assets/icons/community.svg';
import DecksIcon from '@assets/icons/decks.svg';
import FiltersIcon from '@assets/icons/filter.svg';
import HomeIcon from '@assets/icons/home-outline.svg';
import DecksMenuIcon from '@assets/icons/dots-vertical.svg';
import DeckCoverIcon from '@assets/icons/deck-cover.svg';
import { SvgProps } from 'react-native-svg';
import { Box } from '../layout/Box';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export type SearchBarButtonOptions =
  | 'community'
  | 'decks'
  | 'filters'
  | 'home'
  | 'decks_menu'
  | 'deck_cover';

type SearchBarProps = {
  text: string;
  onChangeText: (text: string) => void;
  showMenu?: boolean;
  rightButtons?: SearchBarButtonOptions[];
};

type SearchBarButtonProps = {
  onPress: () => void;
  component: React.FC<SvgProps>;
};

export default function SearchBar({
  text,
  onChangeText,
  showMenu,
  rightButtons = [],
}: SearchBarProps) {
  const { t } = useTranslation('shared');
  const navigation = useNavigation();

  const buttons: { [key in SearchBarButtonOptions]: SearchBarButtonProps } = {
    community: {
      onPress: () => {
        navigation.navigate('CommunityDecks');
      },
      component: props => <CommunityIcon {...props} />,
    },
    decks: {
      onPress: () => {
        navigation.navigate('MyDecks');
      },
      component: props => <DecksIcon {...props} />,
    },
    filters: {
      onPress: () => {
        navigation.getParent()?.dispatch(DrawerActions.openDrawer);
      },
      component: props => <FiltersIcon {...props} />,
    },
    home: {
      onPress: () => {
        navigation.navigate('Home');
      },
      component: props => <HomeIcon {...props} />,
    },
    decks_menu: {
      onPress: () => {
        // TODO: implement decks menu
        console.log('Decks Menu');
      },
      component: props => <DecksMenuIcon {...props} />,
    },
    deck_cover: {
      onPress: () => {
        navigation.navigate('DeckCover');
      },
      component: props => <DeckCoverIcon {...props} />,
    },
  };

  const renderButton = (option: SearchBarButtonOptions) => {
    const IconButton = buttons[option].component;
    const onPress = buttons[option].onPress;

    return (
      <TouchableOpacity onPress={onPress}>
        <Box mx="xsm">
          <IconButton
            key={option}
            width={normalize(30)}
            height={normalize(30)}
            fill={theme.colors.text_default}
          />
        </Box>
      </TouchableOpacity>
    );
  };

  const onPressLeftButton = () => {
    if (showMenu) {
      navigation.dispatch(DrawerActions.openDrawer());
    } else {
      navigation.goBack();
    }
  };

  return (
    <TextInputWrapper>
      <TouchableOpacity onPress={onPressLeftButton}>
        {showMenu ? (
          <MenuIcon width={normalize(30)} height={normalize(30)} fill={theme.colors.text_default} />
        ) : (
          <ChevronLeftIcon
            width={normalize(35)}
            height={normalize(35)}
            fill={theme.colors.text_default}
          />
        )}
      </TouchableOpacity>

      <TextInput
        placeholder={t('search')}
        value={text}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.text_default}
        style={{
          flex: 1,
          fontSize: normalize(27),
          color: theme.colors.text_default,
          fontFamily: 'Univers-Condensed',
          letterSpacing: normalize(1.5),
          marginHorizontal: normalize(8),
        }}
      />

      {rightButtons.map(button => {
        return renderButton(button);
      })}
    </TextInputWrapper>
  );
}
