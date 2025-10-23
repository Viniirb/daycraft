export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly displayName?: string,
    public readonly photoURL?: string,
    public readonly createdAt?: Date
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.id || this.id.trim().length === 0) {
      throw new Error('User ID é obrigatório');
    }

    if (!this.email || this.email.trim().length === 0) {
      throw new Error('Email é obrigatório');
    }

    if (!this.isValidEmail(this.email)) {
      throw new Error('Email inválido');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public getInitials(): string {
    if (this.displayName) {
      const names = this.displayName.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return this.displayName[0].toUpperCase();
    }
    return this.email[0].toUpperCase();
  }

  public hasPhoto(): boolean {
    return !!this.photoURL;
  }
}
