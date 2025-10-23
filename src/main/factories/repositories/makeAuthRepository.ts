import { FirebaseAuthRepository } from '../../../infrastructure/firebase/repositories/FirebaseAuthRepository';
import { IAuthRepository } from '../../../domain/repositories/IAuthRepository';

/**
 * Factory para criar instância do AuthRepository
 */
let authRepositoryInstance: IAuthRepository | null = null;

export function makeAuthRepository(): IAuthRepository {
  if (!authRepositoryInstance) {
    authRepositoryInstance = new FirebaseAuthRepository();
  }
  return authRepositoryInstance;
}
