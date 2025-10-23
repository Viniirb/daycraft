import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../main/config/useAppContext';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { authController } = useAppContext();
  const { register, error: authError } = useAuth(authController);

  const [localError, setLocalError] = useState<string | null>(null);
  const error = authError || localError;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError('As senhas não coincidem.');
      return;
    }

    const success = await register({ email, password, confirmPassword });
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-4xl font-bold text-blue-400">
          DayCraft
        </h1>
        <h2 className="mb-6 text-center text-2xl font-light">Criar Conta</h2>

        {error && (
          <p className="mb-4 rounded bg-red-800 p-3 text-center text-red-100">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
            className="w-full rounded border-none bg-gray-700 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha (mínimo 6 caracteres)"
            required
            minLength={6}
            className="w-full rounded border-none bg-gray-700 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Senha"
            required
            className="w-full rounded border-none bg-gray-700 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-3 font-semibold transition-all duration-300 ease-in-out hover:bg-blue-700"
          >
            Cadastrar
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400">
          Já tem uma conta?{' '}
          <Link
            to="/login"
            className="font-semibold text-blue-400 hover:underline"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
