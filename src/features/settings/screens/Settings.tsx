import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppBar from '@shared/components/AppBar';
import { SafeAreaBox } from '@shared/components/layout/SafeAreaBox';
import { theme } from '@app/theme';
import { Box } from '@shared/components/layout/Box';
import SelectDropdown from 'react-native-select-dropdown';
import Text from '@shared/components/Text';
import i18next from 'i18next';

export default function Settings() {
  const { t } = useTranslation('settings');
  const languages = [
    { label: 'English', key: 'en' },
    { label: 'Português', key: 'pt_br' },
  ];
  const initialLanguage = languages.find(lang => lang.key === i18next.language);

  return (
    <SafeAreaBox flex={1} bg="bg_primary">
      <StatusBar backgroundColor={theme.colors.bg_primary} />

      <Box px="md" flex={1} mt="md">
        <AppBar title={t('title')} />

        <Box px="lg" mt="xlg" flexDirection="row" alignItems="center">
          <Text variant="title" flex={1}>
            {t('language')}
          </Text>
          <Box flex={2}>
            <SelectDropdown
              data={languages}
              onSelect={selectedItem => {
                i18next.changeLanguage(selectedItem.key);
              }}
              defaultButtonText={initialLanguage?.label ?? i18next.language}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem.label;
              }}
              rowTextForSelection={item => {
                return item.label;
              }}
              buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown2BtnTxtStyle}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={styles.dropdown2RowTxtStyle}
            />
          </Box>
        </Box>
      </Box>
    </SafeAreaBox>
  );
}

const styles = StyleSheet.create({
  dropdown2BtnStyle: {
    width: '60%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: { backgroundColor: '#444', borderBottomColor: '#C5C5C5' },
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
