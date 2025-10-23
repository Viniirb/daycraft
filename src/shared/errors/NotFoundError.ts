import { DomainError } from './DomainError';

/**
 * NotFoundError - Shared Layer
 * Erro lançado quando recurso não é encontrado
 */
export class NotFoundError extends DomainError {
  constructor(resource: string, identifier?: string) {
    const message = identifier
      ? `${resource} com identificador '${identifier}' não encontrado`
      : `${resource} não encontrado`;
    super(message, 'NOT_FOUND_ERROR', 404);
  }
}
