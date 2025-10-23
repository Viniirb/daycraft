import { Event } from '../../domain/entities/Event';

/**
 * EventViewModel - Presentation Layer
 * Modelo de visualização para eventos (formato para FullCalendar)
 */
export interface EventViewModel {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  extendedProps: {
    type: string;
    typeLabel: string;
    status: string;
    userId: string;
  };
}

/**
 * Converte Domain Event para ViewModel
 */
export function eventToViewModel(event: Event): EventViewModel {
  const color = event.getColor();
  const { start, end } = event.dateRange.toISOStrings();

  return {
    id: event.id,
    title: event.title,
    start,
    end,
    allDay: event.dateRange.isAllDay(),
    backgroundColor: color,
    borderColor: color,
    textColor: '#ffffff',
    extendedProps: {
      type: event.type.getValue(),
      typeLabel: event.type.getLabel(),
      status: event.status,
      userId: event.userId
    }
  };
}

/**
 * Converte lista de Domain Events para ViewModels
 */
export function eventsToViewModels(events: Event[]): EventViewModel[] {
  return events.map(eventToViewModel);
}
