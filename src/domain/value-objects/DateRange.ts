/**
 * DateRange Value Object - Domain Layer
 * Representa um intervalo de datas com validações
 */
export class DateRange {
  constructor(
    public readonly start: Date,
    public readonly end: Date,
    public readonly allDay: boolean = false
  ) {
    this.validate();
  }

  private validate(): void {
    if (!(this.start instanceof Date) || isNaN(this.start.getTime())) {
      throw new Error('Data de início inválida');
    }

    if (!(this.end instanceof Date) || isNaN(this.end.getTime())) {
      throw new Error('Data de fim inválida');
    }

    if (this.start > this.end) {
      throw new Error('Data de início não pode ser posterior à data de fim');
    }
  }

  public getDurationInDays(): number {
    const diffTime = Math.abs(this.end.getTime() - this.start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  public getDurationInHours(): number {
    const diffTime = Math.abs(this.end.getTime() - this.start.getTime());
    return diffTime / (1000 * 60 * 60);
  }

  public isAllDay(): boolean {
    return this.allDay;
  }

  public isSameDay(): boolean {
    return (
      this.start.getFullYear() === this.end.getFullYear() &&
      this.start.getMonth() === this.end.getMonth() &&
      this.start.getDate() === this.end.getDate()
    );
  }

  public contains(date: Date): boolean {
    return date >= this.start && date <= this.end;
  }

  public overlaps(other: DateRange): boolean {
    return this.start <= other.end && this.end >= other.start;
  }

  public toISOStrings(): { start: string; end: string } {
    return {
      start: this.start.toISOString(),
      end: this.end.toISOString()
    };
  }

  static fromISOStrings(start: string, end: string, allDay: boolean = false): DateRange {
    return new DateRange(new Date(start), new Date(end), allDay);
  }
}
