import { Event } from '../../../domain/entities/Event';
import { IEventRepository } from '../../../domain/repositories/IEventRepository';
import { ValidationError } from '../../../shared/errors';

/**
 * GetUserEvents Use Case - Application Layer
 * Busca todos os eventos de um usuário
 */
export class GetUserEvents {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(userId: string): Promise<Event[]> {
    if (!userId || userId.trim().length === 0) {
      throw new ValidationError('User ID é obrigatório', 'userId');
    }

    const events = await this.eventRepository.findByUserId(userId);
    return events;
  }
}
