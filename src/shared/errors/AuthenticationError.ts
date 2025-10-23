import { DomainError } from './DomainError';

/**
 * AuthenticationError - Shared Layer
 * Erro lançado quando autenticação falha
 */
export class AuthenticationError extends DomainError {
  constructor(message: string = 'Falha na autenticação') {
    super(message, 'AUTHENTICATION_ERROR', 401);
  }
}

/**
 * UnauthorizedError - Shared Layer
 * Erro lançado quando usuário não tem permissão
 */
export class UnauthorizedError extends DomainError {
  constructor(message: string = 'Acesso não autorizado') {
    super(message, 'UNAUTHORIZED_ERROR', 403);
  }
}
