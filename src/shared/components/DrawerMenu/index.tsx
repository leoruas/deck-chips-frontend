import React from 'react';
import { Box } from '@shared/components/layout/Box';
import Divider from '@shared/components/layout/Divider';
import AccountCircle from '@assets/icons/account-circle.svg';
import { normalize } from '@shared/helpers/normalize-pixels';
import { theme } from '@app/theme';
import Text from '@shared/components/Text';
import CommunityIcon from '@assets/icons/community.svg';
import AccountIcon from '@assets/icons/account.svg';
import StarIcon from '@assets/icons/star.svg';
import SettingsIcon from '@assets/icons/settings.svg';
import LogoutIcon from '@assets/icons/logout.svg';
import { SvgProps } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import GradientBox from '@shared/components/layout/GradientBox';
import { useAuth } from '@shared/contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function DrawerMenu() {
  const { t } = useTranslation('home');
  const { setIsLoggedIn } = useAuth();
  const navigation = useNavigation();
  const { authData } = useAuth();

  return (
    <GradientBox flex={1} py="lg" px="md">
      <Box flexDirection="row" alignItems="center">
        <AccountCircle
          width={normalize(70)}
          height={normalize(70)}
          fill={theme.colors.text_default}
        />

        <Box ml="md">
          {/* TODO: Add username and email */}
          <Text numberOfLines={1}>Username</Text>
          <Text numberOfLines={1} fontSize={normalize(14)}>
            {authData?.email}
          </Text>
        </Box>
      </Box>
      <Divider my="md" />

      {RenderDrawerItems()}

      {/* Responsive Spacer */}
      <Box flex={1} />

      <TouchableOpacity
        onPress={() => {
          //TODO: Implement logout
          setIsLoggedIn(false);
          navigation.navigate('Login');
        }}
        style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
        <LogoutIcon width={normalize(30)} height={normalize(30)} fill={theme.colors.text_default} />
        <Text ml="md" fontSize={20}>
          {t('log_out')}
        </Text>
      </TouchableOpacity>
    </GradientBox>
  );
}

const RenderDrawerItems = () => {
  const { t } = useTranslation('home');
  const navigation = useNavigation();

  type DrawerItemKey = 'myAccount' | 'favorites' | 'community' | 'settings';
  interface IDrawerItem {
    onPress: () => void;
    icon: React.FC<SvgProps>;
    label: string;
  }

  const renderItems: DrawerItemKey[] = ['myAccount', 'favorites', 'community', 'settings'];

  const drawerItems: { [key in DrawerItemKey]: IDrawerItem } = {
    myAccount: {
      onPress: () => {
        // TODO: Add navigation
        console.log('My account');
      },
      icon: props => <AccountIcon {...props} />,
      label: t('my_account'),
    },
    favorites: {
      onPress: () => {
        navigation.navigate('MyFavorites');
      },
      icon: props => <StarIcon {...props} />,
      label: t('favorites'),
    },
    community: {
      onPress: () => {
        // TODO: Add navigation
        console.log('Community');
      },
      icon: props => <CommunityIcon {...props} />,
      label: t('community'),
    },
    settings: {
      onPress: () => {
        navigation.navigate('Settings');
      },
      icon: props => <SettingsIcon {...props} />,
      label: t('settings'),
    },
  };

  const renderItem = (item: DrawerItemKey, showDivider: boolean = true) => {
    const Icon = drawerItems[item].icon;
    const label = drawerItems[item].label;
    const onPress = drawerItems[item].onPress;

    return (
      <Box>
        <TouchableOpacity onPress={onPress}>
          <Box flexDirection="row" my="md">
            <Icon
              key={item}
              width={normalize(30)}
              height={normalize(30)}
              fill={theme.colors.text_default}
            />
            <Text ml="md">{label}</Text>
          </Box>
        </TouchableOpacity>
        {showDivider && <Divider my="sm" />}
      </Box>
    );
  };

  return (
    <Box>
      {renderItems.map((item, index) => {
        return renderItem(item, index !== renderItems.length - 1);
      })}
    </Box>
  );
};
