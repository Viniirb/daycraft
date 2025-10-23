/**
 * CreateEventDTO - Application Layer
 * DTO para criação de eventos
 */
export interface CreateEventDTO {
  title: string;
  type: string;
  start: string; // ISO string
  end: string;   // ISO string
  allDay: boolean;
  userId: string;
}
