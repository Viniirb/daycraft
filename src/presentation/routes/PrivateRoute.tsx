import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { useAppContext } from '../../main/config/useAppContext';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { authController } = useAppContext();
  const { user } = useAuth(authController);

  return user ? children : <Navigate to="/login" />;
}
