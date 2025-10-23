import { User } from '../entities/User';

/**
 * IUserRepository - Domain Layer (Port)
 * Interface que define o contrato para repositório de usuários
 */
export interface IUserRepository {
  /**
   * Busca usuário por ID
   */
  findById(id: string): Promise<User | null>;

  /**
   * Busca usuário por email
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Cria ou atualiza perfil do usuário
   */
  save(user: User): Promise<User>;

  /**
   * Atualiza informações do perfil
   */
  updateProfile(userId: string, data: Partial<User>): Promise<User>;

  /**
   * Remove usuário
   */
  delete(userId: string): Promise<void>;
}
