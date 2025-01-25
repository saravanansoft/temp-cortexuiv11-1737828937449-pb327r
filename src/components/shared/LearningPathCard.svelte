<script lang="ts">
  import type { LearningPath } from '../../lib/data/mockLearningPaths';
  import { push } from 'svelte-spa-router';
  
  export let path: LearningPath;
  // Add variant prop to handle different display modes if needed
  export let variant: 'dashboard' | 'learning' = 'dashboard';

  function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function handleContinue() {
    push(`/learning-module/${path.id}`);
  }
</script>

<div class="card hover:shadow-xl transition-all duration-300">
  <div class="p-6">
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-xl font-semibold text-gray-900">{path.title}</h3>
      {#if path.aiGenerated}
        <span class="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
          AI Generated
        </span>
      {/if}
    </div>
    
    <p class="text-gray-600 mb-4">{path.description}</p>
    
    <!-- Progress Bar -->
    <div class="mb-4">
      <div class="flex justify-between text-sm text-gray-600 mb-1">
        <span>Progress</span>
        <span>{path.progress}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="bg-primary h-2 rounded-full transition-all duration-300"
          style="width: {path.progress}%"
        ></div>
      </div>
    </div>
    
    <!-- Modules Preview -->
    <div class="mb-4">
      <h4 class="text-sm font-medium text-gray-700 mb-2">Modules</h4>
      <ul class="space-y-2">
        {#each path.modules.slice(0, 2) as module}
          <li class="flex items-center text-sm">
            <span class={`w-2 h-2 rounded-full mr-2 ${module.completed ? 'bg-green-500' : 'bg-gray-300'}`}></span>
            <span class={module.completed ? 'text-gray-600 line-through' : 'text-gray-700'}>
              {module.title}
            </span>
          </li>
        {/each}
        {#if path.modules.length > 2}
          <li class="text-sm text-gray-500">
            +{path.modules.length - 2} more modules
          </li>
        {/if}
      </ul>
    </div>
    
    <!-- Footer -->
    <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
      <span class="text-sm text-gray-500">
        Last accessed: {formatDate(path.lastAccessed)}
      </span>
      <button class="btn-primary" on:click={handleContinue}>
        Continue Learning
      </button>
    </div>
  </div>
</div>