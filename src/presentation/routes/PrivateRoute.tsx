import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import type { JSX } from 'react';
import { useAppContext } from '../../main/config/useAppContext';
import { useAuth } from '../hooks/useAuth';
import MainLayout from '../components/layout/MainLayout';

interface PrivateRouteProps {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { authController } = useAppContext();
  const { user, loading } = useAuth(authController);

  if (loading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-900 text-white">
        <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
        <p className="mt-4 text-lg text-gray-300">Carregando...</p>
      </div>
    );
  }

  return user ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
}
