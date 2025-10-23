import { Event } from '../../../domain/entities/Event';
import { IEventRepository } from '../../../domain/repositories/IEventRepository';
import { NotFoundError, UnauthorizedError } from '../../../shared/errors';

/**
 * UpdateEvent Use Case - Application Layer
 * Atualiza um evento existente
 */
export class UpdateEvent {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(eventId: string, userId: string, updates: Partial<Event>): Promise<Event> {
    // Buscar evento existente
    const existingEvent = await this.eventRepository.findById(eventId);

    if (!existingEvent) {
      throw new NotFoundError('Evento', eventId);
    }

    // Verificar se o usuário tem permissão
    if (!existingEvent.belongsToUser(userId)) {
      throw new UnauthorizedError('Você não tem permissão para atualizar este evento');
    }

    // Aplicar updates (mantém validações da entidade)
    const updatedEvent = Event.reconstruct(
      existingEvent.id,
      updates.title ?? existingEvent.title,
      updates.type ?? existingEvent.type,
      updates.dateRange ?? existingEvent.dateRange,
      existingEvent.userId,
      updates.status ?? existingEvent.status,
      existingEvent.createdAt || new Date(),
      new Date() // updatedAt
    );

    // Persistir
    return await this.eventRepository.update(updatedEvent);
  }
}
