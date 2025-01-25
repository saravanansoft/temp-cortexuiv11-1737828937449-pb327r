<script lang="ts">
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { profileQuestions } from '../lib/data/profileQuestions';
  import { user } from '../lib/stores/auth';
  
  let currentGroupIndex = 0;
  let answers: Record<string, any> = {};
  let loading = false;
  
  onMount(() => {
    if (!$user) {
      push('/login');
    }
  });
  
  async function handleSubmit() {
    loading = true;
    // Simulate saving profile data
    await new Promise(resolve => setTimeout(resolve, 1000));
    loading = false;
    push('/dashboard');
  }
  
  function handleNext() {
    if (currentGroupIndex < profileQuestions.length - 1) {
      currentGroupIndex++;
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  }
  
  function handlePrevious() {
    if (currentGroupIndex > 0) {
      currentGroupIndex--;
      window.scrollTo(0, 0);
    }
  }

  $: currentGroup = profileQuestions[currentGroupIndex];
  $: progress = ((currentGroupIndex + 1) / profileQuestions.length) * 100;
</script>

<div class="max-w-2xl mx-auto py-8">
  <div class="card">
    <!-- Progress Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-gray-900">{currentGroup.title}</h2>
        <span class="text-sm text-gray-600">Step {currentGroupIndex + 1} of {profileQuestions.length}</span>
      </div>
      
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="bg-primary h-2 rounded-full transition-all duration-500"
          style="width: {progress}%"
        ></div>
      </div>
      
      <p class="text-gray-600 mt-4">{currentGroup.description}</p>
    </div>
    
    <!-- Questions -->
    <div class="space-y-6">
      {#each currentGroup.questions as question}
        <div class="question-container">
          <label class="block text-sm font-medium text-gray-900 mb-2">
            {question.text}
            {#if question.required}
              <span class="text-red-500">*</span>
            {/if}
          </label>
          
          {#if question.type === 'text'}
            <input 
              type="text"
              bind:value={answers[question.id]}
              class="input-field"
              required={question.required}
            />
          {:else if question.type === 'date'}
            <input 
              type="date"
              bind:value={answers[question.id]}
              class="input-field"
              required={question.required}
            />
          {:else if question.type === 'select'}
            <select 
              bind:value={answers[question.id]}
              class="input-field"
              required={question.required}
            >
              <option value="">Select an option</option>
              {#each question.options || [] as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          {:else if question.type === 'multiselect'}
            <div class="space-y-2">
              {#each question.options || [] as option}
                <label class="flex items-center space-x-2">
                  <input 
                    type="checkbox"
                    bind:group={answers[question.id]}
                    value={option}
                    class="rounded text-primary focus:ring-primary"
                  />
                  <span>{option}</span>
                </label>
              {/each}
            </div>
          {:else if question.type === 'number'}
            <input 
              type="number"
              bind:value={answers[question.id]}
              class="input-field"
              required={question.required}
            />
          {/if}
        </div>
      {/each}
    </div>
    
    <!-- Navigation Buttons -->
    <div class="flex justify-between mt-8">
      <button 
        class="btn-secondary"
        on:click={handlePrevious}
        disabled={currentGroupIndex === 0 || loading}
      >
        Previous
      </button>
      
      <button 
        class="btn-primary"
        on:click={handleNext}
        disabled={loading}
      >
        {#if loading}
          Saving...
        {:else if currentGroupIndex === profileQuestions.length - 1}
          Complete Profile
        {:else}
          Next
        {/if}
      </button>
    </div>
  </div>
</div>

<style>
  .question-container {
    @apply bg-white p-6 rounded-lg shadow-sm border border-gray-100;
  }
</style>