import { auth } from '../firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { writable, derived } from 'svelte/store';
import { linkedinService } from '../services/auth/linkedin/linkedinService';


interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  // Initialize the listener
  onAuthStateChanged(auth, (user) => {
    update(state => ({ ...state, user, loading: false }));
  });

  return {
    subscribe,
    getCurrentUser: () => auth.currentUser,
    getIdToken: async () => {
      const user = auth.currentUser;
      if (!user) return null;
      return user.getIdToken(true);
    },
    getUserId: () => auth.currentUser?.uid || null,
    loginWithLinkedIn: async () => {
      try {
        update(state => ({ ...state, loading: true, error: null }));
        const accessToken = await linkedinService.authorize();
        console.log('LinkedIn access token:', accessToken);
        // The actual auth will happen in the callback route
        return { success: true };
      } catch (error: any) {
        console.error('LinkedIn login error:', error);
        update(state => ({ 
          ...state, 
          loading: false, 
          error: error.message || 'LinkedIn login failed' 
        }));
        return { success: false, error: error.message };
      }
    }
  };
}

export const authStore = createAuthStore();

// Derived store for just the user ID
export const userId = derived(
  authStore,
  $authStore => $authStore.user?.uid || null
);

// Derived store for authentication status
export const isAuthenticated = derived(
  authStore,
  $authStore => !!$authStore.user
);