import { LoginWithEmail } from '../../application/use-cases/auth/LoginWithEmail';
import { LoginWithProvider } from '../../application/use-cases/auth/LoginWithProvider';
import { RegisterUser } from '../../application/use-cases/auth/RegisterUser';
import { Logout } from '../../application/use-cases/auth/Logout';
import { GetCurrentUser } from '../../application/use-cases/user/GetCurrentUser';
import { IAuthRepository, AuthProvider } from '../../domain/repositories/IAuthRepository';
import { LoginDTO, RegisterDTO } from '../../application/dto/LoginDTO';
import { UserViewModel, userToViewModel } from '../view-models/UserViewModel';

/**
 * AuthController - Presentation Layer
 * Controla a comunicação entre UI e Use Cases de autenticação
 */
export class AuthController {
  private loginWithEmailUseCase: LoginWithEmail;
  private loginWithProviderUseCase: LoginWithProvider;
  private registerUserUseCase: RegisterUser;
  private logoutUseCase: Logout;
  private getCurrentUserUseCase: GetCurrentUser;

  constructor(private readonly authRepository: IAuthRepository) {
    this.loginWithEmailUseCase = new LoginWithEmail(authRepository);
    this.loginWithProviderUseCase = new LoginWithProvider(authRepository);
    this.registerUserUseCase = new RegisterUser(authRepository);
    this.logoutUseCase = new Logout(authRepository);
    this.getCurrentUserUseCase = new GetCurrentUser(authRepository);
  }

  /**
   * Login com email e senha
   */
  async loginWithEmail(dto: LoginDTO): Promise<UserViewModel> {
    const user = await this.loginWithEmailUseCase.execute(dto);
    return userToViewModel(user);
  }

  /**
   * Login com provedor social (Google, GitHub)
   */
  async loginWithGoogle(): Promise<UserViewModel> {
    const user = await this.loginWithProviderUseCase.execute(AuthProvider.GOOGLE);
    return userToViewModel(user);
  }

  async loginWithGitHub(): Promise<UserViewModel> {
    const user = await this.loginWithProviderUseCase.execute(AuthProvider.GITHUB);
    return userToViewModel(user);
  }

  /**
   * Registra novo usuário
   */
  async register(dto: RegisterDTO): Promise<UserViewModel> {
    const user = await this.registerUserUseCase.execute(dto);
    return userToViewModel(user);
  }

  /**
   * Faz logout
   */
  async logout(): Promise<void> {
    await this.logoutUseCase.execute();
  }

  /**
   * Retorna o usuário autenticado atual
   */
  async getCurrentUser(): Promise<UserViewModel | null> {
    const user = await this.getCurrentUserUseCase.execute();
    return user ? userToViewModel(user) : null;
  }

  /**
   * Observa mudanças no estado de autenticação
   */
  onAuthStateChanged(callback: (user: UserViewModel | null) => void): () => void {
    return this.authRepository.onAuthStateChanged((user) => {
      const viewModel = user ? userToViewModel(user) : null;
      callback(viewModel);
    });
  }

  /**
   * Verifica se há usuário autenticado
   */
  async isAuthenticated(): Promise<boolean> {
    return await this.authRepository.isAuthenticated();
  }
}
