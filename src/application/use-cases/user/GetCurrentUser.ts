import { User } from '../../../domain/entities/User';
import { IAuthRepository } from '../../../domain/repositories/IAuthRepository';

/**
 * GetCurrentUser Use Case - Application Layer
 * Retorna o usuário autenticado atual
 */
export class GetCurrentUser {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(): Promise<User | null> {
    return await this.authRepository.getCurrentUser();
  }
}
