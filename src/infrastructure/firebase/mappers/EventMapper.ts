import { Event, EventStatus } from '../../../domain/entities/Event';
import { EventType } from '../../../domain/value-objects/EventType';
import { DateRange } from '../../../domain/value-objects/DateRange';

export interface FirestoreEventData {
  title: string;
  type: string;
  start: string;
  end: string;
  allDay: boolean;
  status: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export class EventMapper {
  /**
   * Converte Domain Event para formato Firestore
   */
  static toFirestore(event: Event): FirestoreEventData {
    const { start, end } = event.dateRange.toISOStrings();

    return {
      title: event.title,
      type: event.type.getValue(),
      start,
      end,
      allDay: event.dateRange.isAllDay(),
      status: event.status,
      userId: event.userId,
      createdAt: event.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: event.updatedAt?.toISOString() || new Date().toISOString()
    };
  }

  /**
   * Converte documento Firestore para Domain Event
   */
  static fromFirestore(data: FirestoreEventData, id: string): Event {
    const eventType = EventType.fromString(data.type);
    const dateRange = DateRange.fromISOStrings(data.start, data.end, data.allDay);

    return Event.reconstruct(
      id,
      data.title,
      eventType,
      dateRange,
      data.userId,
      this.mapStatus(data.status),
      data.createdAt ? new Date(data.createdAt) : new Date(),
      data.updatedAt ? new Date(data.updatedAt) : new Date()
    );
  }

  /**
   * Mapeia string de status para enum
   */
  private static mapStatus(status: string): EventStatus {
    switch (status) {
      case EventStatus.NOT_STARTED:
        return EventStatus.NOT_STARTED;
      case EventStatus.IN_PROGRESS:
        return EventStatus.IN_PROGRESS;
      case EventStatus.COMPLETED:
        return EventStatus.COMPLETED;
      case EventStatus.CANCELLED:
        return EventStatus.CANCELLED;
      default:
        return EventStatus.NOT_STARTED;
    }
  }
}
