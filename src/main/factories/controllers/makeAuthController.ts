import { AuthController } from '../../../presentation/controllers/AuthController';
import { makeAuthRepository } from '../repositories/makeAuthRepository';

/**
 * Factory para criar instância do AuthController
 */
let authControllerInstance: AuthController | null = null;

export function makeAuthController(): AuthController {
  if (!authControllerInstance) {
    const authRepository = makeAuthRepository();
    authControllerInstance = new AuthController(authRepository);
  }
  return authControllerInstance;
}
