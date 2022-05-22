import React from 'react';
import { Box } from '../layout/Box';
import Text from '../Text';
import ChevronLeftIcon from '@assets/icons/chevron-left.svg';
import { useNavigation } from '@react-navigation/native';
import { theme } from '@app/theme';
import { normalize } from '@shared/helpers/normalize-pixels';
import { TouchableOpacity } from 'react-native';

type AppBarProps = {
  title: string;
};

export default function AppBar({ title }: AppBarProps) {
  const navigation = useNavigation();

  return (
    <Box flexDirection="row" py="md" alignItems="center" justifyContent="space-between">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ChevronLeftIcon
          width={normalize(45)}
          height={normalize(45)}
          fill={theme.colors.text_default}
        />
      </TouchableOpacity>

      <Text variant="title">{title}</Text>

      {/* invisible icon for centering text */}
      <ChevronLeftIcon width={normalize(45)} height={normalize(45)} />
    </Box>
  );
}
