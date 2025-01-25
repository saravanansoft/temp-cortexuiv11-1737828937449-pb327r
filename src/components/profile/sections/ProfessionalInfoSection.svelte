<script lang="ts">
  import type { User } from '../../../lib/interfaces/user-profile.interface';
  import ProfessionalInfoForm from '../forms/ProfessionalInfoForm.svelte';

  export let user: Partial<User>;
  export let expanded = false;
  
  function handleSave() {
    // API call will be implemented later
    const successMessage = 'Professional information updated successfully';
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
</script>

<div class="bg-white rounded-lg shadow overflow-hidden">
  <button
    type="button"
    class="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white border-b border-gray-100"
    on:click={() => expanded = !expanded}
  >
    <span class="text-lg font-semibold">Professional Information</span>
    <svg
      class="w-5 h-5 transform transition-transform {expanded ? 'rotate-180' : ''}"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  
  {#if expanded}
    <div class="p-6">
      <ProfessionalInfoForm professionalInfo={user.professionalInfo} onSave={handleSave} />
    </div>
  {/if}
</div>