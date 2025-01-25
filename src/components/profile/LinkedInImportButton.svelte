<script lang="ts">
    import { linkedinService } from '../../lib/services/auth/linkedin/linkedinService';
    import { createEventDispatcher } from 'svelte';
    
    export let loading = false;
    
    const dispatch = createEventDispatcher<{
      import: { data: any };
      error: string;
    }>();
    
    async function handleImport() {
      try {
        loading = true;
        const accessToken = await linkedinService.authorize();
        const profileData = await linkedinService.getProfile(accessToken);
        dispatch('import', { data: profileData });
      } catch (error) {
        console.error('LinkedIn import failed:', error);
        dispatch('error', 'Failed to import LinkedIn profile');
      } finally {
        loading = false;
      }
    }
  </script>
  
  <button
    type="button"
    class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    on:click={handleImport}
    disabled={loading}
  >
    {#if loading}
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
      </svg>
    {:else}
      <svg class="w-5 h-5 mr-2 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
      Import from LinkedIn
    {/if}
  </button>