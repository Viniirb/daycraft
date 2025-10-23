import { FirebaseUserRepository } from '../../../infrastructure/firebase/repositories/FirebaseUserRepository';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';

/**
 * Factory para criar instância do UserRepository
 */
let userRepositoryInstance: IUserRepository | null = null;

export function makeUserRepository(): IUserRepository {
  if (!userRepositoryInstance) {
    userRepositoryInstance = new FirebaseUserRepository();
  }
  return userRepositoryInstance;
}
