import { writable } from "svelte/store";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithEmail,
  signUpWithEmail,
} from "../firebase";

export interface User {
  id: string;
  email: string;
  name: string;
  profileCompleted: boolean;
  photoURL?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

function createAuthStore() {
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
  };

  const { subscribe, set, update } = writable<AuthState>(initialState);

  return {
    subscribe,
    login: async (email: string, password: string) => {
      try {
        update((state) => ({ ...state, loading: true }));
        const result = await signInWithEmail(email, password);

        if (result.success && result.user) {
          const user: User = {
            id: result.user.uid,
            email: result.user.email || "",
            name:
              result.user.displayName || result.user.email?.split("@")[0] || "",
            profileCompleted: false,
            photoURL: result.user.photoURL || undefined,
          };

          update((state) => ({
            user,
            isAuthenticated: true,
            loading: false,
          }));

          return { success: true };
        } else {
          throw new Error(result.error || "Login failed");
        }
      } catch (error: any) {
        update((state) => ({ ...state, loading: false }));
        return { success: false, error: error.message };
      }
    },
    signUp: async (email: string, password: string) => {
      try {
        update((state) => ({ ...state, loading: true }));
        const result = await signUpWithEmail(email, password);

        if (result.success && result.user) {
          const user: User = {
            id: result.user.uid,
            email: result.user.email || "",
            name:
              result.user.displayName || result.user.email?.split("@")[0] || "",
            profileCompleted: false,
            photoURL: result.user.photoURL || undefined,
          };

          update((state) => ({
            user,
            isAuthenticated: true,
            loading: false,
          }));

          return { success: true };
        } else {
          throw new Error(result.error || "Sign up failed");
        }
      } catch (error: any) {
        update((state) => ({ ...state, loading: false }));
        return { success: false, error: error.message };
      }
    },
    loginWithSocial: async (provider: "google" | "facebook") => {
      try {
        update((state) => ({ ...state, loading: true }));

        const result =
          provider === "google"
            ? await signInWithGoogle()
            : await signInWithFacebook();

        if (result.success && result.user) {
          const user: User = {
            id: result.user.uid,
            email: result.user.email || "",
            name:
              result.user.displayName || result.user.email?.split("@")[0] || "",
            profileCompleted: false,
            photoURL: result.user.photoURL || undefined,
          };

          update((state) => ({
            user,
            isAuthenticated: true,
            loading: false,
          }));

          return { success: true };
        } else {
          throw new Error(result.error || "Login failed");
        }
      } catch (error: any) {
        update((state) => ({ ...state, loading: false }));
        return { success: false, error: error.message };
      }
    },
    logout: async () => {
      set(initialState);
    },
  };
}

export const auth_store = createAuthStore();
export const { login, signUp, loginWithSocial, logout } = auth_store;

export const user = {
  subscribe: (fn: (value: User | null) => void) => {
    return auth_store.subscribe((state) => fn(state.user));
  },
};

export const isAuthenticated = {
  subscribe: (fn: (value: boolean) => void) => {
    return auth_store.subscribe((state) => fn(state.isAuthenticated));
  },
};
