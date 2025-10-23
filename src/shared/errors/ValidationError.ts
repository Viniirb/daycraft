import { DomainError } from './DomainError';

/**
 * ValidationError - Shared Layer
 * Erro lançado quando validações de domínio falham
 */
export class ValidationError extends DomainError {
  constructor(message: string, public readonly field?: string) {
    super(message, 'VALIDATION_ERROR', 400);
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      field: this.field
    };
  }
}
