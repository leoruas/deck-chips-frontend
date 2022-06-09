import React from 'react';
import CloseIcon from '@assets/icons/close.svg';
import { useNavigation } from '@react-navigation/native';
import { theme } from '@app/theme';
import { normalize } from '@shared/helpers/normalize-pixels';
import { Box } from '@shared/components/layout/Box';
import Text from '@shared/components/Text';

type DeckAppBarProps = {
  title: string;
};

export default function DeckAppBar({ title }: DeckAppBarProps) {
  const navigation = useNavigation();

  return (
    <Box flexDirection="row" py="md" alignItems="center" justifyContent="space-between">
      <Text variant="title2" numberOfLines={1}>
        {title}
      </Text>

      <CloseIcon
        onPress={() => {
          navigation.goBack();
        }}
        width={normalize(45)}
        height={normalize(45)}
        fill={theme.colors.text_default}
      />
    </Box>
  );
}
