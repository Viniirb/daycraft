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

    // Accept any string as event type to allow for custom types
    // This makes the system extensible for future event types
    return new EventType(normalizedValue as EventTypeEnum);
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
    const valueStr = this.value as string;

    switch (valueStr) {
      case EventTypeEnum.TASK:
      case 'tarefa':
        return '#3B82F6'; // blue
      case EventTypeEnum.REMINDER:
      case 'lembrete':
        return '#F59E0B'; // yellow
      case EventTypeEnum.SPECIAL_DATE:
      case 'data_especial':
        return '#8B5CF6'; // purple
      case 'reuniao':
        return '#10B981'; // green
      case 'evento':
        return '#EC4899'; // pink
      case 'compromisso':
        return '#06B6D4'; // cyan
      case 'habito':
        return '#F97316'; // orange
      default:
        return '#3B82F6'; // default blue
    }
  }

  public equals(other: EventType): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
