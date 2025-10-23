import { User } from '../../../domain/entities/User';
import { IAuthRepository } from '../../../domain/repositories/IAuthRepository';
import { LoginDTO } from '../../dto/LoginDTO';
import { ValidationError } from '../../../shared/errors';

/**
 * LoginWithEmail Use Case - Application Layer
 * Autentica usuário com email e senha
 */
export class LoginWithEmail {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(dto: LoginDTO): Promise<User> {
    this.validate(dto);

    const user = await this.authRepository.loginWithEmail({
      email: dto.email.trim().toLowerCase(),
      password: dto.password
    });

    return user;
  }

  private validate(dto: LoginDTO): void {
    if (!dto.email || dto.email.trim().length === 0) {
      throw new ValidationError('Email é obrigatório', 'email');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dto.email)) {
      throw new ValidationError('Email inválido', 'email');
    }

    if (!dto.password || dto.password.length === 0) {
      throw new ValidationError('Senha é obrigatória', 'password');
    }

    if (dto.password.length < 6) {
      throw new ValidationError('Senha deve ter no mínimo 6 caracteres', 'password');
    }
  }
}
