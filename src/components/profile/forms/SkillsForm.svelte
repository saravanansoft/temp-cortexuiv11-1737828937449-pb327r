<script lang="ts">
    import type { Skills } from '../../../lib/interfaces/user-profile.interface';
    import TokenInput from '../../shared/TokenInput.svelte';
    
    export let skills: Partial<Skills> = {};
    export let onSave: () => Promise<void>;
    
    let loading = false;
    let saved = false;
    
    let technicalSkills: string[] = skills.technicalSkills || [];
    let softSkills: string[] = skills.softSkills || [];
    let certifications: string[] = skills.certifications || [];
    let languages: string[] = skills.languages || [];
    
    $: skills.technicalSkills = technicalSkills;
    $: skills.softSkills = softSkills;
    $: skills.certifications = certifications;
    $: skills.languages = languages;
  
    async function handleSubmit() {
      loading = true;
      await onSave();
      loading = false;
      saved = true;
      setTimeout(() => saved = false, 3000);
    }
  </script>
  
  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Technical Skills
        </label>
        <TokenInput
          bind:tokens={technicalSkills}
          placeholder="Add technical skills (e.g., JavaScript, Python, AWS)"
          maxTokens={20}
        />
        <p class="mt-1 text-sm text-gray-500">
          Add your technical skills, programming languages, tools, and technologies
        </p>
      </div>
  
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Soft Skills
        </label>
        <TokenInput
          bind:tokens={softSkills}
          placeholder="Add soft skills (e.g., Leadership, Communication)"
          maxTokens={15}
        />
        <p class="mt-1 text-sm text-gray-500">
          Add your interpersonal and transferable skills
        </p>
      </div>
  
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Certifications & Qualifications
        </label>
        <TokenInput
          bind:tokens={certifications}
          placeholder="Add certifications (e.g., AWS Solutions Architect)"
          maxTokens={10}
        />
        <p class="mt-1 text-sm text-gray-500">
          Add your professional certifications and qualifications
        </p>
      </div>
  
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Languages
        </label>
        <TokenInput
          bind:tokens={languages}
          placeholder="Add languages (e.g., English - Native, Spanish - Intermediate)"
          maxTokens={8}
        />
        <p class="mt-1 text-sm text-gray-500">
          Add languages you speak and your proficiency level
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