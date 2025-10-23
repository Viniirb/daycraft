import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../firebaseConfig';
import { Github, Chrome } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: unknown) {
      console.error(err);
      setError('E-mail ou senha inválidos.');
    }
  };

  const handleSocialLogin = async (
    provider: typeof googleProvider | typeof githubProvider,
  ) => {
    setError(null);
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err: unknown) {
      console.error(err);
      setError('Falha ao fazer login com o provedor.');
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-4xl font-bold text-blue-400">
          DayCraft
        </h1>
        <h2 className="mb-6 text-center text-2xl font-light">Login</h2>

        {error && (
          <p className="mb-4 rounded bg-red-800 p-3 text-center text-red-100">
            {error}
          </p>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-6">
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
            placeholder="Senha"
            required
            className="w-full rounded border-none bg-gray-700 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-3 font-semibold transition-all duration-300 ease-in-out hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <span className="w-full border-b border-gray-700"></span>
          <span className="mx-4 text-sm uppercase text-gray-400">Ou</span>
          <span className="w-full border-b border-gray-700"></span>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleSocialLogin(googleProvider)}
            className="flex w-full items-center justify-center gap-3 rounded bg-gray-700 p-3 font-semibold transition-all duration-300 ease-in-out hover:bg-gray-600"
          >
            <Chrome className="h-5 w-5" /> Entrar com Google
          </button>
          <button
            onClick={() => handleSocialLogin(githubProvider)}
            className="flex w-full items-center justify-center gap-3 rounded bg-gray-700 p-3 font-semibold transition-all duration-300 ease-in-out hover:bg-gray-600"
          >
            <Github className="h-5 w-5" /> Entrar com GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-gray-400">
          Não tem uma conta?{' '}
          <Link
            to="/register"
            className="font-semibold text-blue-400 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}