<script lang="ts">
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import { linkedinService } from "../lib/services/auth/linkedin/linkedinService";
  import { authStore } from "../lib/stores/linkedinAuthStore";

  let error = "";
  let isLoading = true;

  async function exchangeCodeForToken(code: string) {
    try {
      const redirectUri = encodeURIComponent(`${window.location.origin}/linkedin-callback.html`);
      const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_LINKEDIN_CLIENT_SECRET;

      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('redirect_uri', redirectUri);
      params.append('client_id', clientId);
      params.append('client_secret', clientSecret);

      const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error_description || 'Failed to exchange code for token');
      }

      const data = await response.json();
      return { 
        accessToken: data.access_token, 
        expiresIn: data.expires_in 
      };
    } catch (err) {
      console.error('Token exchange error:', err);
      throw err;
    }
  }

  onMount(async () => {
    try {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.split('?')[1] || '');
      const code = params.get('code');

      if (!code) {
        throw new Error('No authorization code received');
      }

      console.log('Exchanging code for token...');
      const { accessToken, expiresIn } = await exchangeCodeForToken(code);
      console.log('Token received:', accessToken);

      console.log('Logging in with LinkedIn...');
      await authStore.loginWithLinkedIn(accessToken, expiresIn);

      isLoading = false;
      window.location.href = '#/dashboard';
    } catch (err) {
      console.error('LinkedIn callback error:', err);
      isLoading = false;
      error = err instanceof Error ? err.message : 'Failed to complete LinkedIn authentication';
    }
  });
</script>

<div class="min-h-screen flex items-center justify-center">
  {#if isLoading}
    <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full">
      <span class="sr-only">Loading...</span>
    </div>
  {:else if error}
    <div class="text-center">
      <p class="text-red-500 mb-4">{error}</p>
      <button class="btn-primary" on:click={() => push("/profile-settings")}>
        Return to Profile Settings
      </button>
    </div>
  {/if}
</div>