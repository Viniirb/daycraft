import { EventType } from '../value-objects/EventType';
import { DateRange } from '../value-objects/DateRange';

export enum EventStatus {
  NOT_STARTED = 'Não Iniciado',
  IN_PROGRESS = 'Em Andamento',
  COMPLETED = 'Concluído',
  CANCELLED = 'Cancelado'
}

export class Event {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly type: EventType,
    public readonly dateRange: DateRange,
    public readonly userId: string,
    public readonly status: EventStatus = EventStatus.NOT_STARTED,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    private readonly skipIdValidation: boolean = false
  ) {
    this.validate();
  }

  private validate(): void {
    // ID pode ser vazio ao criar um novo evento (será gerado pelo repositório)
    if (!this.skipIdValidation && (!this.id || this.id.trim().length === 0)) {
      throw new Error('Event ID é obrigatório');
    }

    if (!this.title || this.title.trim().length === 0) {
      throw new Error('Título do evento é obrigatório');
    }

    if (this.title.length > 200) {
      throw new Error('Título do evento não pode ter mais de 200 caracteres');
    }

    if (!this.userId || this.userId.trim().length === 0) {
      throw new Error('User ID é obrigatório');
    }
  }

  public isCompleted(): boolean {
    return this.status === EventStatus.COMPLETED;
  }

  public isCancelled(): boolean {
    return this.status === EventStatus.CANCELLED;
  }

  public isActive(): boolean {
    return !this.isCompleted() && !this.isCancelled();
  }

  public isPast(): boolean {
    return this.dateRange.end < new Date();
  }

  public isToday(): boolean {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return this.dateRange.contains(today);
  }

  public belongsToUser(userId: string): boolean {
    return this.userId === userId;
  }

  public getColor(): string {
    return this.type.getColor();
  }

  static create(
    id: string,
    title: string,
    type: EventType,
    dateRange: DateRange,
    userId: string,
    status: EventStatus = EventStatus.NOT_STARTED
  ): Event {
    return new Event(
      id,
      title,
      type,
      dateRange,
      userId,
      status,
      new Date(),
      new Date(),
      true // skipIdValidation: permite ID vazio ao criar novo evento
    );
  }

  static reconstruct(
    id: string,
    title: string,
    type: EventType,
    dateRange: DateRange,
    userId: string,
    status: EventStatus,
    createdAt: Date,
    updatedAt: Date
  ): Event {
    return new Event(
      id,
      title,
      type,
      dateRange,
      userId,
      status,
      createdAt,
      updatedAt,
      false // skipIdValidation: false porque o ID já deve existir ao reconstruir
    );
  }
}
