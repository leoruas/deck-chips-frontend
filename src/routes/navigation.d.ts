import { AuthorizedStackParamList } from './Authorized.routes';
import { FeedStackParamList } from './Feed.routes';
import { HomeTabParamList } from './Home.routes';
import { UnauthorizedStackParamList } from './Unauthorized.routes';
import { ResponsableStackParamList } from './Responsable.routes';

type NavigationRouteList = UnauthorizedStackParamList &
  AuthorizedStackParamList &
  HomeTabParamList &
  FeedStackParamList &
  ResponsableStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationRouteList {}
  }
}
