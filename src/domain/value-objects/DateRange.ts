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
    if (this.allDay) {
      // Para eventos de dia inteiro, retorna apenas a data (YYYY-MM-DD)
      // sem informação de hora, para evitar problemas de timezone
      return {
        start: this.formatDateOnly(this.start),
        end: this.formatDateOnly(this.end)
      };
    }

    return {
      start: this.start.toISOString(),
      end: this.end.toISOString()
    };
  }

  private formatDateOnly(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static fromISOStrings(start: string, end: string, allDay: boolean = false): DateRange {
    if (allDay) {
      // Para eventos de dia inteiro, parseia a data sem considerar timezone
      // Cria a data às 00:00:00 no horário local
      const startDate = this.parseDateOnly(start);
      const endDate = this.parseDateOnly(end);
      return new DateRange(startDate, endDate, allDay);
    }

    return new DateRange(new Date(start), new Date(end), allDay);
  }

  private static parseDateOnly(dateString: string): Date {
    // Remove qualquer informação de hora se houver
    const dateOnly = dateString.split('T')[0];
    const [year, month, day] = dateOnly.split('-').map(Number);
    // Cria a data às 00:00:00 no horário local (não UTC)
    return new Date(year, month - 1, day);
  }
}
