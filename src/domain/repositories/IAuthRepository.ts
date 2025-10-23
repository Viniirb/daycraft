import { User } from '../entities/User';

/**
 * Credenciais para login com email/senha
 */
export interface EmailCredentials {
  email: string;
  password: string;
}

/**
 * Dados para registro de novo usuário
 */
export interface RegisterData {
  email: string;
  password: string;
  displayName?: string;
}

/**
 * Provedores de autenticação social
 */
export enum AuthProvider {
  GOOGLE = 'google',
  GITHUB = 'github'
}

/**
 * IAuthRepository - Domain Layer (Port)
 * Interface que define o contrato para autenticação
 */
export interface IAuthRepository {
  /**
   * Retorna o usuário autenticado atual
   */
  getCurrentUser(): Promise<User | null>;

  /**
   * Login com email e senha
   */
  loginWithEmail(credentials: EmailCredentials): Promise<User>;

  /**
   * Login com provedor social (Google, GitHub, etc)
   */
  loginWithProvider(provider: AuthProvider): Promise<User>;

  /**
   * Registra novo usuário
   */
  register(data: RegisterData): Promise<User>;

  /**
   * Logout do usuário atual
   */
  logout(): Promise<void>;

  /**
   * Observa mudanças no estado de autenticação
   * Retorna função para cancelar observação
   */
  onAuthStateChanged(callback: (user: User | null) => void): () => void;

  /**
   * Envia email de recuperação de senha
   */
  sendPasswordResetEmail(email: string): Promise<void>;

  /**
   * Verifica se há um usuário autenticado
   */
  isAuthenticated(): Promise<boolean>;
}
