import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAppContext } from '../../main/config/useAppContext';
import { useAuth } from '../hooks/useAuth';
import PrivateRoute from './PrivateRoute';
import MainLayout from '../components/layout/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Calendar from '../pages/Calendar';
import Finance from '../pages/Finance';
import Music from '../pages/Music';
import Games from '../pages/Games';
import Hobbies from '../pages/Hobbies';

export default function AppRouter() {
  const { authController } = useAppContext();
  const { user, loading } = useAuth(authController);

  if (loading) {
    return (
      <div className="loading-screen">
        <Loader2 className="spinner-large" />
        <p>Carregando...</p>

        <style>{`
          .loading-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: var(--bg-primary);
            color: var(--text-primary);
            gap: var(--space-4);
          }

          .spinner-large {
            width: 48px;
            height: 48px;
            animation: spin 1s linear infinite;
            color: var(--accent-blue);
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />

        {/* Private Routes with Layout */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/music" element={<Music />} />
          <Route path="/games" element={<Games />} />
          <Route path="/hobbies" element={<Hobbies />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
