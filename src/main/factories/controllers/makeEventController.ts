import { EventController } from '../../../presentation/controllers/EventController';
import { makeEventRepository } from '../repositories/makeEventRepository';

/**
 * Factory para criar instância do EventController
 */
let eventControllerInstance: EventController | null = null;

export function makeEventController(): EventController {
  if (!eventControllerInstance) {
    const eventRepository = makeEventRepository();
    eventControllerInstance = new EventController(eventRepository);
  }
  return eventControllerInstance;
}
