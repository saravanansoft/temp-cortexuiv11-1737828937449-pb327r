<script lang="ts">
  import type { ProfessionalInfo } from '../../../lib/interfaces/user-profile.interface';
  import TokenInput from '../../shared/TokenInput.svelte';
  
  export let professionalInfo: Partial<ProfessionalInfo> = {};
  export let onSave: () => Promise<void>;
  
  let loading = false;
  let saved = false;
  
  let currentRoleSkills: string[] = professionalInfo.currentRoleSkills ? 
    professionalInfo.currentRoleSkills.split(',').map(s => s.trim()) : [];
  
  let learningNeeds: string[] = professionalInfo.currentRoleLearningNeeds ? 
    professionalInfo.currentRoleLearningNeeds.split(',').map(n => n.trim()) : [];
  
  $: professionalInfo.currentRoleSkills = currentRoleSkills.join(', ');
  $: professionalInfo.currentRoleLearningNeeds = learningNeeds.join(', ');
  
  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Manufacturing',
    'Other'
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
      <label class="block text-sm font-medium text-gray-700">Current Role</label>
      <input 
        type="text" 
        bind:value={professionalInfo.currentRole} 
        class="input-field"
      />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Industry</label>
      <select 
        bind:value={professionalInfo.industry} 
        class="input-field"
      >
        <option value="">Select industry</option>
        {#each industries as industry}
          <option value={industry}>{industry}</option>
        {/each}
      </select>
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Years of Experience</label>
      <input 
        type="number" 
        bind:value={professionalInfo.yearsOfExperience} 
        min="0"
        max="50"
        class="input-field"
      />
    </div>
  </div>

  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Current Role Skills
      </label>
      <TokenInput
        bind:tokens={currentRoleSkills}
        placeholder="Type a skill and press Enter"
        maxTokens={20}
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Current Role Learning Needs
      </label>
      <TokenInput
        bind:tokens={learningNeeds}
        placeholder="Type a learning need and press Enter"
        maxTokens={15}
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