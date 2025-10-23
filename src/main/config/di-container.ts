/**
 * Dependency Injection Container
 * Gerencia todas as dependências da aplicação
 */

import { makeAuthRepository } from '../factories/repositories/makeAuthRepository';
import { makeEventRepository } from '../factories/repositories/makeEventRepository';
import { makeUserRepository } from '../factories/repositories/makeUserRepository';
import { makeAuthController } from '../factories/controllers/makeAuthController';
import { makeEventController } from '../factories/controllers/makeEventController';

import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { IEventRepository } from '../../domain/repositories/IEventRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { AuthController } from '../../presentation/controllers/AuthController';
import { EventController } from '../../presentation/controllers/EventController';

/**
 * Container de Injeção de Dependências
 */
export class DIContainer {
  private static instance: DIContainer;

  private constructor() {}

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  // Repositories
  getAuthRepository(): IAuthRepository {
    return makeAuthRepository();
  }

  getEventRepository(): IEventRepository {
    return makeEventRepository();
  }

  getUserRepository(): IUserRepository {
    return makeUserRepository();
  }

  // Controllers
  getAuthController(): AuthController {
    return makeAuthController();
  }

  getEventController(): EventController {
    return makeEventController();
  }
}

// Export singleton instance
export const container = DIContainer.getInstance();
