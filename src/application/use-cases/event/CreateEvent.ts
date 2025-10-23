import { Event, EventStatus } from '../../../domain/entities/Event';
import type { IEventRepository } from '../../../domain/repositories/IEventRepository';
import { EventType } from '../../../domain/value-objects/EventType';
import { DateRange } from '../../../domain/value-objects/DateRange';
import type { CreateEventDTO } from '../../dto/CreateEventDTO';
import { ValidationError } from '../../../shared/errors';

/**
 * CreateEvent Use Case - Application Layer
 * Responsável por criar novos eventos
 */
export class CreateEvent {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(dto: CreateEventDTO): Promise<Event> {
    console.log('CreateEvent.execute - Iniciando com DTO:', dto);

    // Validações de entrada
    this.validate(dto);
    console.log('CreateEvent.execute - Validação passou');

    // Criar value objects
    const eventType = EventType.fromString(dto.type);
    console.log('CreateEvent.execute - EventType criado:', eventType);

    const dateRange = DateRange.fromISOStrings(dto.start, dto.end, dto.allDay);
    console.log('CreateEvent.execute - DateRange criado:', dateRange);

    // Criar entidade de domínio (sem ID ainda, será gerado pelo repositório)
    const event = Event.create(
      '', // ID será gerado pelo repositório
      dto.title.trim(),
      eventType,
      dateRange,
      dto.userId,
      EventStatus.NOT_STARTED
    );
    console.log('CreateEvent.execute - Entidade Event criada:', event);

    // Persistir no repositório
    console.log('CreateEvent.execute - Chamando repositório...');
    const createdEvent = await this.eventRepository.create(event);
    console.log('CreateEvent.execute - Evento persistido:', createdEvent);

    return createdEvent;
  }

  private validate(dto: CreateEventDTO): void {
    if (!dto.title || dto.title.trim().length === 0) {
      throw new ValidationError('Título é obrigatório', 'title');
    }

    if (dto.title.length > 200) {
      throw new ValidationError('Título não pode ter mais de 200 caracteres', 'title');
    }

    if (!dto.type) {
      throw new ValidationError('Tipo do evento é obrigatório', 'type');
    }

    if (!dto.start) {
      throw new ValidationError('Data de início é obrigatória', 'start');
    }

    if (!dto.end) {
      throw new ValidationError('Data de fim é obrigatória', 'end');
    }

    if (!dto.userId) {
      throw new ValidationError('Usuário não identificado', 'userId');
    }
  }
}
