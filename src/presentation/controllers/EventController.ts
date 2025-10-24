import { CreateEvent } from '../../application/use-cases/event/CreateEvent';
import { GetUserEvents } from '../../application/use-cases/event/GetUserEvents';
import { UpdateEvent } from '../../application/use-cases/event/UpdateEvent';
import { DeleteEvent } from '../../application/use-cases/event/DeleteEvent';
import { IEventRepository } from '../../domain/repositories/IEventRepository';
import { CreateEventDTO } from '../../application/dto/CreateEventDTO';
import { EventViewModel, eventsToViewModels, eventToViewModel } from '../view-models/EventViewModel';

/**
 * EventController - Presentation Layer
 * Controla a comunicação entre UI e Use Cases de eventos
 */
export class EventController {
  private createEventUseCase: CreateEvent;
  private getUserEventsUseCase: GetUserEvents;
  private updateEventUseCase: UpdateEvent;
  private deleteEventUseCase: DeleteEvent;

  constructor(private readonly eventRepository: IEventRepository) {
    this.createEventUseCase = new CreateEvent(eventRepository);
    this.getUserEventsUseCase = new GetUserEvents(eventRepository);
    this.updateEventUseCase = new UpdateEvent(eventRepository);
    this.deleteEventUseCase = new DeleteEvent(eventRepository);
  }

  /**
   * Cria um novo evento
   */
  async createEvent(dto: CreateEventDTO): Promise<EventViewModel> {
    const event = await this.createEventUseCase.execute(dto);
    return eventToViewModel(event);
  }

  /**
   * Busca todos os eventos de um usuário
   */
  async getUserEvents(userId: string): Promise<EventViewModel[]> {
    const events = await this.getUserEventsUseCase.execute(userId);
    return eventsToViewModels(events);
  }

  /**
   * Atualiza um evento
   */
  async updateEvent(eventId: string, userId: string, updates: Record<string, unknown>): Promise<EventViewModel> {
    const event = await this.updateEventUseCase.execute(eventId, userId, updates);
    return eventToViewModel(event);
  }

  /**
   * Deleta um evento
   */
  async deleteEvent(eventId: string, userId: string): Promise<void> {
    await this.deleteEventUseCase.execute(eventId, userId);
  }

  /**
   * Observa eventos de um usuário em tempo real
   */
  observeUserEvents(userId: string, callback: (events: EventViewModel[]) => void): () => void {
    return this.eventRepository.observeByUserId(userId, (events) => {
      const viewModels = eventsToViewModels(events);
      callback(viewModels);
    });
  }
}
