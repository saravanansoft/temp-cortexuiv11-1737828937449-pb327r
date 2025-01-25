<script lang="ts">
  import { onMount } from 'svelte';
  import type { User } from '../../lib/interfaces/user-profile.interface';
  import { user as userStore } from '../../lib/stores/auth';
  import LinkedInImportButton from './LinkedInImportButton.svelte';
  import PersonalInfoSection from './sections/PersonalInfoSection.svelte';
  import ProfessionalInfoSection from './sections/ProfessionalInfoSection.svelte';
  import CareerHistorySection from './sections/CareerHistorySection.svelte';
  import LearningPreferencesSection from './sections/LearningPreferencesSection.svelte';
  import SkillsSection from './sections/SkillsSection.svelte';
  import HobbiesSection from './sections/HobbiesSection.svelte';

  let user: Partial<User> = {
    learningPreferences: {},
    professionalInfo: {},
    careerHistory: [],
    careerGoals: [],
    skills: {},
    hobbies: {}
  };

  let expandedSections: Record<string, boolean> = {
    personal: true,
    professional: false,
    career: false,
    learning: false,
    skills: false,
    hobbies: false
  };

  let importLoading = false;

  onMount(() => {
    if ($userStore) {
      user = {
        ...user,
        name: $userStore.name,
        email: $userStore.email,
      };
    }
  });

  function handleLinkedInImport(event: CustomEvent<{ data: Partial<User> }>) {
    const importedData = event.detail.data;
    user = {
      ...user,
      ...importedData
    };
  }

  function handleImportError(error: string) {
    // Show error notification
    console.error('LinkedIn import error:', error);
  }
</script>

<div class="w-full min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p class="mt-2 text-gray-600">Manage your personal information and preferences</p>
        </div>
        <LinkedInImportButton
          bind:loading={importLoading}
          on:import={handleLinkedInImport}
          on:error={handleImportError}
        />
      </div>
    </div>

    <div class="space-y-6">
      <PersonalInfoSection 
        {user} 
        expanded={expandedSections.personal} 
      />
      
      <ProfessionalInfoSection 
        {user} 
        expanded={expandedSections.professional} 
      />
      
      <CareerHistorySection 
        {user} 
        expanded={expandedSections.career} 
      />

      <LearningPreferencesSection 
        {user} 
        expanded={expandedSections.learning} 
      />

      <SkillsSection 
        {user} 
        expanded={expandedSections.skills} 
      />

      <HobbiesSection 
        {user} 
        expanded={expandedSections.hobbies} 
      />
    </div>
  </div>
</div>