export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  profileComplete: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}