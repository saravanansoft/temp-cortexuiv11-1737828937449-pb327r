import { writable } from 'svelte/store';
import { linkedinService } from '../services/auth/linkedin/linkedinService';
import { push } from 'svelte-spa-router';

interface User {
  id: string;
  email: string;
  name: string;
  profileCompleted: boolean;
  photoURL?: string;
  linkedinConnected: boolean;
  accessToken: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

function createAuthStore() {
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false, 
    loading: false,
    error: null
  };

  const { subscribe, set, update } = writable<AuthState>(initialState);

  return {
    subscribe,
    loginWithLinkedIn: async (accessToken: string, expiresIn: number) => {
      try {
        if (!accessToken) {
          throw new Error('Access token is required');
        }
    
        update(state => ({ ...state, loading: true, error: null }));
        
        const linkedinProfile = await linkedinService.getProfile(accessToken);
    
        const user: User = {
          id: linkedinProfile.id,
          email: linkedinProfile.email,
          name: linkedinProfile.name,
          profileCompleted: true,
          linkedinConnected: true,
          accessToken
        };
    
        update(state => ({
          user,
          isAuthenticated: true,
          loading: false,
          error: null
        }));
        console.log('LinkedIn login successful');
        console.log('User:', user);
        // Force a small delay to ensure state is updated
        await new Promise(resolve => setTimeout(resolve, 100));
        
        return { success: true };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to login with LinkedIn';
        update(state => ({ 
          ...state, 
          loading: false,
          error: errorMessage
        }));
        return { success: false, error: errorMessage };
      }
    }    
  };
}

export const authStore = createAuthStore();
export const { loginWithLinkedIn, logout } = authStore;