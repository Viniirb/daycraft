/**
 * DomainError - Shared Layer
 * Classe base para todos os erros de domínio
 */
export abstract class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 400
  ) {
    super(message);
    this.name = this.constructor.name;
    const captureStackTrace = (Error as unknown as { captureStackTrace?: (target: object, constructor: unknown) => void }).captureStackTrace;
    if (captureStackTrace) {
      captureStackTrace(this, this.constructor);
    }
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode
    };
  }
}
