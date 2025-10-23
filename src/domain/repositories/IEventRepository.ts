import { Event } from '../entities/Event';

/**
 * IEventRepository - Domain Layer (Port)
 * Interface que define o contrato para repositório de eventos
 * Implementações concretas ficam na camada de infraestrutura
 */
export interface IEventRepository {
  /**
   * Cria um novo evento
   */
  create(event: Event): Promise<Event>;

  /**
   * Busca um evento por ID
   */
  findById(id: string): Promise<Event | null>;

  /**
   * Busca todos os eventos de um usuário
   */
  findByUserId(userId: string): Promise<Event[]>;

  /**
   * Atualiza um evento existente
   */
  update(event: Event): Promise<Event>;

  /**
   * Remove um evento
   */
  delete(id: string): Promise<void>;

  /**
   * Observa eventos de um usuário em tempo real
   * Retorna função para cancelar observação
   */
  observeByUserId(userId: string, callback: (events: Event[]) => void): () => void;
}
