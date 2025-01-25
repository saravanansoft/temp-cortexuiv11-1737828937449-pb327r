<script lang="ts">
  import type { User } from '../../../lib/interfaces/user-profile.interface';
  
  export let user: Partial<User>;
  export let onSave: () => Promise<void>;
  
  let loading = false;
  let saved = false;
  
  async function handleSubmit() {
    loading = true;
    await onSave();
    loading = false;
    saved = true;
    setTimeout(() => saved = false, 3000);
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Full Name</label>
      <input 
        type="text" 
        bind:value={user.name} 
        class="input-field"
        required
      />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input 
        type="email" 
        bind:value={user.email} 
        class="input-field"
        required
        readonly
      />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Phone Number</label>
      <input 
        type="tel" 
        bind:value={user.phoneNumber} 
        class="input-field"
      />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Date of Birth</label>
      <input 
        type="date" 
        bind:value={user.dateOfBirth} 
        class="input-field"
      />
    </div>
  </div>

  <div class="flex justify-end space-x-4">
    {#if saved}
      <span class="text-green-500 flex items-center">
        <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Saved successfully!
      </span>
    {/if}
    <button
      type="submit"
      class="btn-primary min-w-[100px]"
      disabled={loading}
    >
      {loading ? 'Saving...' : 'Save'}
    </button>
  </div>
</form>