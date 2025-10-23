/**
 * LoginDTO - Application Layer
 * DTO para login de usuários
 */
export interface LoginDTO {
  email: string;
  password: string;
}

/**
 * RegisterDTO - Application Layer
 * DTO para registro de novos usuários
 */
export interface RegisterDTO {
  email: string;
  password: string;
  confirmPassword: string;
  displayName?: string;
}
