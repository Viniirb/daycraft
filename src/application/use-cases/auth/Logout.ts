import { IAuthRepository } from '../../../domain/repositories/IAuthRepository';

/**
 * Logout Use Case - Application Layer
 * Faz logout do usuário atual
 */
export class Logout {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.logout();
  }
}
