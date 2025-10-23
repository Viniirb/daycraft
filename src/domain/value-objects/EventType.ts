/**
 * EventType Value Object - Domain Layer
 * Representa os tipos de eventos permitidos no sistema
 */
export enum EventTypeEnum {
  TASK = 'tarefa',
  REMINDER = 'lembrete',
  SPECIAL_DATE = 'data_especial'
}

export class EventType {
  private constructor(private readonly value: EventTypeEnum) {}

  static fromString(value: string): EventType {
    const normalizedValue = value.toLowerCase();

    switch (normalizedValue) {
      case EventTypeEnum.TASK:
        return new EventType(EventTypeEnum.TASK);
      case EventTypeEnum.REMINDER:
        return new EventType(EventTypeEnum.REMINDER);
      case EventTypeEnum.SPECIAL_DATE:
        return new EventType(EventTypeEnum.SPECIAL_DATE);
      default:
        throw new Error(`Tipo de evento inválido: ${value}`);
    }
  }

  static task(): EventType {
    return new EventType(EventTypeEnum.TASK);
  }

  static reminder(): EventType {
    return new EventType(EventTypeEnum.REMINDER);
  }

  static specialDate(): EventType {
    return new EventType(EventTypeEnum.SPECIAL_DATE);
  }

  public getValue(): string {
    return this.value;
  }

  public getLabel(): string {
    switch (this.value) {
      case EventTypeEnum.TASK:
        return 'Tarefa';
      case EventTypeEnum.REMINDER:
        return 'Lembrete';
      case EventTypeEnum.SPECIAL_DATE:
        return 'Data Especial';
    }
  }

  public getColor(): string {
    switch (this.value) {
      case EventTypeEnum.TASK:
        return '#3B82F6'; // blue
      case EventTypeEnum.REMINDER:
        return '#10B981'; // green
      case EventTypeEnum.SPECIAL_DATE:
        return '#F59E0B'; // yellow
    }
  }

  public equals(other: EventType): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
