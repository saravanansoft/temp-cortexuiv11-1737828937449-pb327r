<script lang="ts">
  import type { CareerEntry } from '../../../lib/interfaces/user-profile.interface';
  import Modal from '../../shared/Modal.svelte';
  import CareerEntryForm from './CareerEntryForm.svelte';
  
  export let careerHistory: CareerEntry[] = [];
  export let onSave: () => Promise<void>;
  
  let showModal = false;
  let currentEntry: CareerEntry | null = null;
  let loading = false;
  let saved = false;
  
  function createNewEntry(): CareerEntry {
    return {
      id: crypto.randomUUID(),
      companyName: '',
      jobTitle: '',
      startDate: '',
      current: false,
      keyResponsibilities: '',
      keyAchievements: ''
    };
  }

  function addNewEntry() {
    currentEntry = createNewEntry();
    showModal = true;
  }

  function editEntry(entry: CareerEntry) {
    currentEntry = { ...entry };
    showModal = true;
  }

  function deleteEntry(id: string) {
    careerHistory = careerHistory.filter(entry => entry.id !== id);
  }

  async function handleSave() {
    if (currentEntry) {
      const index = careerHistory.findIndex(e => e.id === currentEntry?.id);
      if (index === -1) {
        careerHistory = [...careerHistory, currentEntry];
      } else {
        careerHistory[index] = currentEntry;
        careerHistory = [...careerHistory];
      }
      showModal = false;
      currentEntry = null;

      loading = true;
      await onSave();
      loading = false;
      saved = true;
      setTimeout(() => saved = false, 3000);
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <button
      type="button"
      class="btn-secondary"
      on:click={addNewEntry}
    >
      Add Company
    </button>

    {#if saved}
      <span class="text-green-500 flex items-center">
        <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Saved successfully!
      </span>
    {/if}
  </div>

  {#if careerHistory.length === 0}
    <p class="text-center text-gray-500 py-8">
      No career history added yet. Click "Add Company" to get started.
    </p>
  {:else}
    <div class="space-y-4">
      {#each careerHistory as entry (entry.id)}
        <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h4 class="font-medium text-gray-900">{entry.companyName}</h4>
              <p class="text-gray-600">{entry.jobTitle}</p>
              <p class="text-sm text-gray-500">
                {new Date(entry.startDate).toLocaleDateString()} - 
                {entry.current ? 'Present' : new Date(entry.endDate || '').toLocaleDateString()}
              </p>
            </div>
            <div class="flex space-x-2">
              <button
                type="button"
                class="text-gray-600 hover:text-primary"
                on:click={() => editEntry(entry)}
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                type="button"
                class="text-gray-600 hover:text-red-600"
                on:click={() => deleteEntry(entry.id)}
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<Modal 
  bind:show={showModal}
  title={currentEntry?.id ? 'Edit Career Entry' : 'Add Career Entry'}
>
  {#if currentEntry}
    <CareerEntryForm bind:entry={currentEntry} />
  {/if}
  
  <svelte:fragment slot="footer">
    <div class="flex justify-end space-x-4">
      <button 
        type="button" 
        class="btn-secondary"
        on:click={() => showModal = false}
      >
        Cancel
      </button>
      <button 
        type="button" 
        class="btn-primary"
        on:click={handleSave}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save'}
      </button>
    </div>
  </svelte:fragment>
</Modal>