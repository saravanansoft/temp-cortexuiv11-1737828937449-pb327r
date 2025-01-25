<script lang="ts">
  import type { Hobbies } from '../../../lib/interfaces/user-profile.interface';
  import TokenInput from '../../shared/TokenInput.svelte';
  
  export let hobbies: Partial<Hobbies> = {};
  export let onSave: () => Promise<void>;
  
  let loading = false;
  let saved = false;
  
  let interests: string[] = hobbies.interests || [];
  
  $: hobbies.interests = interests;

  async function handleSubmit() {
    loading = true;
    await onSave();
    loading = false;
    saved = true;
    setTimeout(() => saved = false, 3000);
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6">
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Personal Interests
      </label>
      <TokenInput
        bind:tokens={interests}
        placeholder="Add your hobbies and interests"
        maxTokens={15}
      />
      <p class="mt-1 text-sm text-gray-500">
        Add your hobbies, interests, and activities you enjoy outside of work
      </p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">
        Additional Details
      </label>
      <textarea 
        bind:value={hobbies.description}
        rows="3"
        class="input-field"
        placeholder="Share more details about your interests..."
      ></textarea>
      <p class="mt-1 text-sm text-gray-500">
        Optional: Provide more context about your hobbies and what you enjoy about them
      </p>
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