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

type ButtonOptions = 'community' | 'decks' | 'filters';

export type SearchBarProps = {
  showMenu?: boolean;
  rightButtons?: ButtonOptions[];
};

const buttons: { [key in ButtonOptions]: React.FC<SvgProps> } = {
  community: props => <CommunityIcon {...props} />,
  decks: props => <DecksIcon {...props} />,
  filters: props => <FiltersIcon {...props} />,
};

const renderButton = (option: ButtonOptions) => {
  // TODO: verificar keys repetidas
  const IconButton = buttons[option];
  return (
    <TouchableOpacity>
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

export default function SearchBar({ showMenu, rightButtons = [] }: SearchBarProps) {
  const { t } = useTranslation('shared');

  return (
    <TextInputWrapper>
      <TouchableOpacity>
        {showMenu ? (
          <MenuIcon width={normalize(30)} height={normalize(30)} fill={theme.colors.text_default} />
        ) : (
          <ChevronLeftIcon
            width={normalize(30)}
            height={normalize(30)}
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
          letterSpacing: normalize(1),
          marginHorizontal: normalize(8),
        }}
      />

      {rightButtons.map(button => {
        return renderButton(button);
      })}
    </TextInputWrapper>
  );
}
