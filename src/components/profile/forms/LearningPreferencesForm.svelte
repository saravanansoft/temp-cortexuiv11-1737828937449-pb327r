<script lang="ts">
  import type { LearningPreference } from '../../../lib/interfaces/user-profile.interface';
  import TokenInput from '../../shared/TokenInput.svelte';
  
  export let preferences: Partial<LearningPreference> = {};
  export let onSave: () => Promise<void>;
  
  let loading = false;
  let saved = false;
  
  let preferredTopics: string[] = preferences.preferredTopics ? 
    preferences.preferredTopics.split(',').map(t => t.trim()) : [];
  
  $: preferences.preferredTopics = preferredTopics.join(', ');
  
  const learningStyles = [
    'Visual',
    'Auditory',
    'Reading/Writing',
    'Kinesthetic'
  ];
  
  const collaborationPreferences = [
    'Individual',
    'Group',
    'Mixed'
  ];
  
  const learningPaces = [
    'Slow',
    'Moderate',
    'Fast'
  ];
  
  const scheduleTypes = [
    'Fixed',
    'Flexible'
  ];

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
      <label class="block text-sm font-medium text-gray-700">Learning Style</label>
      <select 
        bind:value={preferences.learningStyle} 
        class="input-field"
      >
        <option value="">Select learning style</option>
        {#each learningStyles as style}
          <option value={style}>{style}</option>
        {/each}
      </select>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Collaboration Preference</label>
      <select 
        bind:value={preferences.collaborationPreference} 
        class="input-field"
      >
        <option value="">Select preference</option>
        {#each collaborationPreferences as pref}
          <option value={pref}>{pref}</option>
        {/each}
      </select>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Learning Pace</label>
      <select 
        bind:value={preferences.learningPace} 
        class="input-field"
      >
        <option value="">Select pace</option>
        {#each learningPaces as pace}
          <option value={pace}>{pace}</option>
        {/each}
      </select>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Schedule Type</label>
      <select 
        bind:value={preferences.schedule} 
        class="input-field"
      >
        <option value="">Select schedule type</option>
        {#each scheduleTypes as type}
          <option value={type}>{type}</option>
        {/each}
      </select>
    </div>
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">
      Preferred Learning Topics
    </label>
    <TokenInput
      bind:tokens={preferredTopics}
      placeholder="Type a topic and press Enter"
      maxTokens={15}
    />
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