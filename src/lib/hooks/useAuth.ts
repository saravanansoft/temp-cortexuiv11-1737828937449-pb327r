import { derived } from "svelte/store";
import { authStore } from "../services/authService";

export function useAuth() {
  const user = derived(authStore, ($authStore) => $authStore.user);

  const loading = derived(authStore, ($authStore) => $authStore.loading);

  const error = derived(authStore, ($authStore) => $authStore.error);

  return {
    user,
    loading,
    error,
    getCurrentUser: authStore.getCurrentUser,
    getIdToken: authStore.getIdToken,
    getUserId: authStore.getUserId,
  };
}
