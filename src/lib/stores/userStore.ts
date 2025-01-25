import { writable } from 'svelte/store';

export interface User {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  linkedinConnected?: boolean;
  accessToken?: string;
  professionalInfo?: {
    currentRole?: string;
    company?: string;
  };
}

function createUserStore() {
  const { subscribe, set, update } = writable<User>({
    linkedinConnected: false
  });

  return {
    subscribe,
    set,
    update,
    reset: () => set({
      linkedinConnected: false
    }),
    setLinkedInConnection: (connected: boolean) => update(user => ({
      ...user,
      linkedinConnected: connected
    })),
    clearLinkedInData: () => update(user => ({
      ...user,
      linkedinConnected: false,
      accessToken: undefined
    }))
  };
}

export const userStore = createUserStore();