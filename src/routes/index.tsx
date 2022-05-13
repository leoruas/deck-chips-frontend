import { useAuth } from '@shared/contexts/AuthContext';
import React from 'react';
import AuthRoutes from './Auth.routes';
import DefaultRoutes from './Default.routes';

export default function Routes() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <DefaultRoutes /> : <AuthRoutes />;
}
