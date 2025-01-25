<script lang="ts">
  import type { CareerEntry } from '../../../lib/interfaces/user-profile.interface';
  import TokenInput from '../../shared/TokenInput.svelte';
  
  export let entry: CareerEntry;
  
  let responsibilities: string[] = entry.keyResponsibilities ? entry.keyResponsibilities.split(',').map(r => r.trim()) : [];
  let achievements: string[] = entry.keyAchievements ? entry.keyAchievements.split(',').map(a => a.trim()) : [];
  
  $: entry.keyResponsibilities = responsibilities.join(', ');
  $: entry.keyAchievements = achievements.join(', ');
  
  function handleCurrentChange() {
    if (entry.current) {
      entry.endDate = undefined;
    }
  }
</script>

<div class="space-y-4">
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Company Name</label>
      <input 
        type="text" 
        bind:value={entry.companyName} 
        class="input-field"
        required
      />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Job Title</label>
      <input 
        type="text" 
        bind:value={entry.jobTitle} 
        class="input-field"
        required
      />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Start Date</label>
      <input 
        type="date" 
        bind:value={entry.startDate} 
        class="input-field"
        required
      />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">End Date</label>
      <div class="space-y-2">
        <input 
          type="date" 
          bind:value={entry.endDate} 
          class="input-field"
          disabled={entry.current}
          required={!entry.current}
        />
        <label class="flex items-center space-x-2">
          <input 
            type="checkbox" 
            bind:checked={entry.current} 
            on:change={handleCurrentChange}
            class="rounded text-primary focus:ring-primary"
          />
          <span class="text-sm text-gray-600">I currently work here</span>
        </label>
      </div>
    </div>
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Key Responsibilities</label>
    <TokenInput
      bind:tokens={responsibilities}
      placeholder="Type a responsibility and press Enter"
      maxTokens={10}
    />
    <p class="mt-1 text-sm text-gray-500">
      Tip: Add your main duties and responsibilities one at a time.
    </p>
  </div>

  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">Key Achievements</label>
    <TokenInput
      bind:tokens={achievements}
      placeholder="Type an achievement and press Enter"
      maxTokens={10}
    />
    <p class="mt-1 text-sm text-gray-500">
      Tip: Focus on quantifiable results and impact. Add one achievement at a time.
    </p>
  </div>
</div>