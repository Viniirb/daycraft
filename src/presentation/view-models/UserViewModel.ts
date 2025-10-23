import { User } from '../../domain/entities/User';

/**
 * UserViewModel - Presentation Layer
 * Modelo de visualização para usuário
 */
export interface UserViewModel {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  initials: string;
  hasPhoto: boolean;
}

/**
 * Converte Domain User para ViewModel
 */
export function userToViewModel(user: User): UserViewModel {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    initials: user.getInitials(),
    hasPhoto: user.hasPhoto()
  };
}
