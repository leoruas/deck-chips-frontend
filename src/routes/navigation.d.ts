import { DefaultStackParamList } from './Default.routes';
import { AuthStackParamList } from './Auth.routes';

type NavigationRouteList = DefaultStackParamList & AuthStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationRouteList {}
  }
}
