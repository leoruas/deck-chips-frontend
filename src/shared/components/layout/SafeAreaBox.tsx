import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { createBox } from '@shopify/restyle';
import { Theme } from '@app/theme';

export const SafeAreaBox = createBox<Theme, SafeAreaViewProps>(SafeAreaView);
