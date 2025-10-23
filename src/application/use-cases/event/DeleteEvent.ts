import { IEventRepository } from '../../../domain/repositories/IEventRepository';
import { NotFoundError, UnauthorizedError } from '../../../shared/errors';

/**
 * DeleteEvent Use Case - Application Layer
 * Remove um evento
 */
export class DeleteEvent {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(eventId: string, userId: string): Promise<void> {
    // Buscar evento existente
    const existingEvent = await this.eventRepository.findById(eventId);

    if (!existingEvent) {
      throw new NotFoundError('Evento', eventId);
    }

    // Verificar permissão
    if (!existingEvent.belongsToUser(userId)) {
      throw new UnauthorizedError('Você não tem permissão para deletar este evento');
    }

    // Deletar
    await this.eventRepository.delete(eventId);
  }
}
