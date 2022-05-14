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
import { SvgProps } from 'react-native-svg';
import { Box } from '../layout/Box';
import { DrawerActions, useNavigation } from '@react-navigation/native';

type ButtonOptions = 'community' | 'decks' | 'filters';

type SearchBarProps = {
  showMenu?: boolean;
  rightButtons?: ButtonOptions[];
};

type SearchBarButtonProps = {
  onPress: () => void;
  component: React.FC<SvgProps>;
};

export default function SearchBar({ showMenu, rightButtons = [] }: SearchBarProps) {
  const { t } = useTranslation('shared');
  const navigation = useNavigation();

  const buttons: { [key in ButtonOptions]: SearchBarButtonProps } = {
    community: {
      onPress: () => {
        // TODO: Add navigation
        console.log('Community');
      },
      component: props => <CommunityIcon {...props} />,
    },
    decks: {
      onPress: () => {
        // TODO: Add navigation
        console.log('Decks');
      },
      component: props => <DecksIcon {...props} />,
    },
    filters: {
      onPress: () => {
        navigation.getParent()?.dispatch(DrawerActions.openDrawer);
      },
      component: props => <FiltersIcon {...props} />,
    },
  };

  const renderButton = (option: ButtonOptions) => {
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
