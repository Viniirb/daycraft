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
    this.validate(dto);

    const eventType = EventType.fromString(dto.type);
    const dateRange = DateRange.fromISOStrings(dto.start, dto.end, dto.allDay);

    const event = Event.create(
      '',
      dto.title.trim(),
      eventType,
      dateRange,
      dto.userId,
      EventStatus.NOT_STARTED,
      dto.checklist,
      dto.recurrence,
      dto.habitGoal,
      dto.habitStreak
    );

    const createdEvent = await this.eventRepository.create(event);
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
