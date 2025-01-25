<script lang="ts">
  export let path: {
    id: string;
    title: string;
    progress: number;
    modules: Array<{ title: string; completed: boolean }>;
  };
</script>

<div class="card hover:shadow-xl transition-shadow">
  <h3 class="text-xl font-semibold mb-4">{path.title}</h3>

  <div class="mb-4">
    <div class="w-full bg-gray-200 rounded-full h-2.5">
      <div
        class="bg-primary h-2.5 rounded-full"
        style="width: {path.progress}%"
      ></div>
    </div>
    <p class="text-sm text-gray-600 mt-2">{path.progress}% Complete</p>
  </div>

  <div class="space-y-2">
    {#each path.modules as module}
      <div class="flex items-center">
        <input
          type="checkbox"
          checked={module.completed}
          class="mr-2"
          disabled
        />
        <span class="text-sm">{module.title}</span>
      </div>
    {/each}
  </div>

  <button class="btn-secondary w-full mt-4"> Continue Learning </button>
</div>
