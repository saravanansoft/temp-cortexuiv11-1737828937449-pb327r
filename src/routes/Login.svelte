<script lang="ts">
  import { push } from 'svelte-spa-router';
  import { login, loginWithSocial } from '../lib/stores/auth';
  import { linkedinService } from '../lib/services/auth/linkedin/linkedinService';
  import { authStore } from '../lib/stores/linkedinAuthStore';
  
  let email = '';
  let password = '';
  let error = '';
  let loading = false;
  
  async function handleSubmit() {
    if (loading) return;
    
    loading = true;
    error = '';
    
    const result = await login(email, password);
    if (result.success) {
      push('/dashboard');
    } else {
      error = result.error || 'Invalid credentials';
    }
    
    loading = false;
  }

  async function handleSocialLogin(provider: "google" | "facebook") {
    if (loading) return;
    
    loading = true;
    error = '';
    
    try {
      const result = await loginWithSocial(provider);
      if (result.success) {
        push('/dashboard');
      } else {
        error = result.error || `${provider} sign in failed`;
      }
    } catch (err) {
      error = 'Authentication failed';
    } finally {
      loading = false;
    }
  }

  async function handleLinkedInLogin() {
    if (loading) return;
    
    loading = true;
    error = '';
    
    try {
      const code = await linkedinService.authorize();
      console.log('LinkedIn code:', code);
      const result = await authStore.loginWithLinkedIn(code, 3600);
      
      if (result.success) {
        await push('/dashboard');
      } else {
        error = 'LinkedIn sign in failed';
      }
    } catch (err) {
      console.error('LinkedIn login error:', err);
      error = err instanceof Error ? err.message : 'Authentication failed';
    } finally {
      loading = false;
    }
  }
</script>

<div class="max-w-md mx-auto">
  <div class="card">
    <h2 class="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input 
          type="email" 
          bind:value={email}
          class="input-field"
          required
          disabled={loading}
          placeholder="Enter your email"
        />
      </div>
      
      <div>
        <div class="flex justify-between items-center mb-1">
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <a 
            href="/#/forgot-password" 
            class="text-sm text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <input 
          type="password" 
          bind:value={password}
          class="input-field"
          required
          disabled={loading}
          placeholder="Enter your password"
        />
      </div>
      
      {#if error}
        <p class="text-red-500 text-sm text-center">{error}</p>
      {/if}
      
      <button type="submit" class="btn-primary w-full" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
    
    <div class="mt-6">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">
            Or sign in with
          </span>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-3 gap-4">
        <button
          type="button"
          on:click={() => handleSocialLogin('google')}
          disabled={loading}
          class="social-button"
        >
          {#if loading}
            <div class="loading-spinner"></div>
          {:else}
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          {/if}
        </button>

        <button
          type="button"
          on:click={() => handleSocialLogin('facebook')}
          disabled={loading}
          class="social-button"
        >
          {#if loading}
            <div class="loading-spinner"></div>
          {:else}
            <svg class="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          {/if}
        </button>

        <button
          type="button"
          on:click={handleLinkedInLogin}
          disabled={loading}
          class="social-button"
        >
          {#if loading}
            <div class="loading-spinner"></div>
          {:else}
            <svg class="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          {/if}
        </button>
      </div>

      <div class="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <a href="/#/signup" class="text-primary hover:underline">Sign up</a>
      </div>
    </div>
  </div>
</div>

<style>
  .social-button {
    @apply w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .loading-spinner {
    @apply animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full;
  }
</style>