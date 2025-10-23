import { useState, useEffect } from 'react';
import { UserViewModel } from '../view-models/UserViewModel';
import { AuthController } from '../controllers/AuthController';
import { LoginDTO, RegisterDTO } from '../../application/dto/LoginDTO';

/**
 * useAuth Hook - Presentation Layer
 * Hook React para gerenciar autenticação
 */
export function useAuth(authController: AuthController) {
  const [user, setUser] = useState<UserViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Observa mudanças no estado de autenticação
  useEffect(() => {
    const unsubscribe = authController.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [authController]);

  /**
   * Login com email e senha
   */
  const loginWithEmail = async (dto: LoginDTO): Promise<boolean> => {
    try {
      setError(null);
      setLoading(true);
      const loggedUser = await authController.loginWithEmail(dto);
      setUser(loggedUser);
      return true;
    } catch (err) {
      setError((err as Error).message || 'Erro ao fazer login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login com Google
   */
  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      setError(null);
      setLoading(true);
      const loggedUser = await authController.loginWithGoogle();
      setUser(loggedUser);
      return true;
    } catch (err) {
      setError((err as Error).message || 'Erro ao fazer login com Google');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login com GitHub
   */
  const loginWithGitHub = async (): Promise<boolean> => {
    try {
      setError(null);
      setLoading(true);
      const loggedUser = await authController.loginWithGitHub();
      setUser(loggedUser);
      return true;
    } catch (err) {
      setError((err as Error).message || 'Erro ao fazer login com GitHub');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Registra novo usuário
   */
  const register = async (dto: RegisterDTO): Promise<boolean> => {
    try {
      setError(null);
      setLoading(true);
      const newUser = await authController.register(dto);
      setUser(newUser);
      return true;
    } catch (err) {
      setError((err as Error).message || 'Erro ao registrar usuário');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Faz logout
   */
  const logout = async (): Promise<void> => {
    try {
      setError(null);
      await authController.logout();
      setUser(null);
    } catch (err) {
      setError((err as Error).message || 'Erro ao fazer logout');
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    loginWithEmail,
    loginWithGoogle,
    loginWithGitHub,
    register,
    logout
  };
}
