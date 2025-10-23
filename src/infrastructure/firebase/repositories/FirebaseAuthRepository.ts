import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  GoogleAuthProvider,
  GithubAuthProvider,
  User as FirebaseUser,
  Unsubscribe
} from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { User } from '../../../domain/entities/User';
import {
  IAuthRepository,
  EmailCredentials,
  RegisterData,
  AuthProvider
} from '../../../domain/repositories/IAuthRepository';
import { UserMapper } from '../mappers/UserMapper';
import { AuthenticationError } from '../../../shared/errors';

/**
 * FirebaseAuthRepository - Infrastructure Layer
 * Implementação do repositório de autenticação usando Firebase
 */
export class FirebaseAuthRepository implements IAuthRepository {
  private googleProvider = new GoogleAuthProvider();
  private githubProvider = new GithubAuthProvider();

  async getCurrentUser(): Promise<User | null> {
    const firebaseUser = auth.currentUser;
    return firebaseUser ? UserMapper.toDomain(firebaseUser) : null;
  }

  async loginWithEmail(credentials: EmailCredentials): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      return UserMapper.toDomain(userCredential.user);
    } catch (error: unknown) {
      throw this.handleAuthError(error as { code?: string; message?: string });
    }
  }

  async loginWithProvider(provider: AuthProvider): Promise<User> {
    try {
      const authProvider = this.getAuthProvider(provider);
      const userCredential = await signInWithPopup(auth, authProvider);

      return UserMapper.toDomain(userCredential.user);
    } catch (error: unknown) {
      throw this.handleAuthError(error as { code?: string; message?: string });
    }
  }

  async register(data: RegisterData): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // TODO: Atualizar displayName se fornecido
      // await updateProfile(userCredential.user, { displayName: data.displayName });

      return UserMapper.toDomain(userCredential.user);
    } catch (error: unknown) {
      throw this.handleAuthError(error as { code?: string; message?: string });
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch {
      throw new AuthenticationError('Erro ao fazer logout');
    }
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    const unsubscribe: Unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        const user = firebaseUser ? UserMapper.toDomain(firebaseUser) : null;
        callback(user);
      }
    );

    return unsubscribe;
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await firebaseSendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      throw this.handleAuthError(error as { code?: string; message?: string });
    }
  }

  async isAuthenticated(): Promise<boolean> {
    return auth.currentUser !== null;
  }

  private getAuthProvider(provider: AuthProvider) {
    switch (provider) {
      case AuthProvider.GOOGLE:
        return this.googleProvider;
      case AuthProvider.GITHUB:
        return this.githubProvider;
      default:
        throw new Error(`Provedor não suportado: ${provider}`);
    }
  }

  private handleAuthError(error: { code?: string; message?: string }): AuthenticationError {
    const errorMessages: Record<string, string> = {
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'auth/email-already-in-use': 'Email já está em uso',
      'auth/weak-password': 'Senha muito fraca',
      'auth/invalid-email': 'Email inválido',
      'auth/user-disabled': 'Usuário desabilitado',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde',
      'auth/network-request-failed': 'Erro de conexão. Verifique sua internet',
      'auth/popup-closed-by-user': 'Autenticação cancelada pelo usuário'
    };

    const message = (error.code && errorMessages[error.code]) || error.message || 'Erro na autenticação';
    return new AuthenticationError(message);
  }
}
