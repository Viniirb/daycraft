import { User } from '../../../domain/entities/User';
import { IAuthRepository } from '../../../domain/repositories/IAuthRepository';
import { RegisterDTO } from '../../dto/LoginDTO';
import { ValidationError } from '../../../shared/errors';

/**
 * RegisterUser Use Case - Application Layer
 * Registra novo usuário no sistema
 */
export class RegisterUser {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(dto: RegisterDTO): Promise<User> {
    this.validate(dto);

    const user = await this.authRepository.register({
      email: dto.email.trim().toLowerCase(),
      password: dto.password,
      displayName: dto.displayName?.trim()
    });

    return user;
  }

  private validate(dto: RegisterDTO): void {
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

    if (!dto.confirmPassword) {
      throw new ValidationError('Confirmação de senha é obrigatória', 'confirmPassword');
    }

    if (dto.password !== dto.confirmPassword) {
      throw new ValidationError('As senhas não coincidem', 'confirmPassword');
    }

    if (dto.displayName && dto.displayName.trim().length < 2) {
      throw new ValidationError('Nome deve ter no mínimo 2 caracteres', 'displayName');
    }
  }
}
