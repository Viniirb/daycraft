import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAppContext } from '../../main/config/useAppContext';
import { useAuth } from '../hooks/useAuth';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Finance from '../pages/Finance';
import Hobbies from '../pages/Hobbies';

export default function AppRouter() {
  const { authController } = useAppContext();
  const { user, loading } = useAuth(authController);

  if (loading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-900 text-white">
        <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/finance"
          element={
            <PrivateRoute>
              <Finance />
            </PrivateRoute>
          }
        />
        <Route
          path="/hobbies"
          element={
            <PrivateRoute>
              <Hobbies />
            </PrivateRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}
