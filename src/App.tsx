import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Finance from './pages/Finance';
import Hobbies from './pages/Hobbies';
import { Loader2 } from 'lucide-react';
import type { JSX } from 'react';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const [user, loading] = useAuthState(auth);

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

function App() {
  const [user, loading] = useAuthState(auth);

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

export default App;