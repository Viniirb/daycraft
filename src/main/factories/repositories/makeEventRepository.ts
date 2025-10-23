import { FirebaseEventRepository } from '../../../infrastructure/firebase/repositories/FirebaseEventRepository';
import { IEventRepository } from '../../../domain/repositories/IEventRepository';

/**
 * Factory para criar instância do EventRepository
 */
let eventRepositoryInstance: IEventRepository | null = null;

export function makeEventRepository(): IEventRepository {
  if (!eventRepositoryInstance) {
    eventRepositoryInstance = new FirebaseEventRepository();
  }
  return eventRepositoryInstance;
}
