import { User } from '../../../domain/entities/User';
import { IAuthRepository, AuthProvider } from '../../../domain/repositories/IAuthRepository';
import { ValidationError } from '../../../shared/errors';

/**
 * LoginWithProvider Use Case - Application Layer
 * Autentica usuário com provedor social (Google, GitHub)
 */
export class LoginWithProvider {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(provider: AuthProvider): Promise<User> {
    if (!provider) {
      throw new ValidationError('Provedor de autenticação é obrigatório', 'provider');
    }

    const validProviders = Object.values(AuthProvider);
    if (!validProviders.includes(provider)) {
      throw new ValidationError(`Provedor inválido: ${provider}`, 'provider');
    }

    const user = await this.authRepository.loginWithProvider(provider);

    return user;
  }
}
