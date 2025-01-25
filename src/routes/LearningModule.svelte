<script lang="ts">
  import { onMount } from "svelte";
  import { mockLearningPaths } from "../lib/data/mockLearningPaths";
  import type { LearningPath } from "../lib/data/mockLearningPaths";
  import ModuleAccordion from "../components/learning/ModuleAccordion.svelte";
  import { learningPathService } from "../lib/services/learningPathService";
  import { useAuth } from "../lib/hooks/useAuth";
  import { push } from "svelte-spa-router";

  export let params: { id: string };

  let path: LearningPath | undefined;
  let loading = true;
  let error: string | null = null;
  let currentModuleId: string | null = null;

  const { getUserId } = useAuth();

  onMount(async () => {
    // Simulate API call
    loadLearningModule();
  });

  async function loadLearningModule() {
    const userId = getUserId();
    if (!userId) {
      push("/login");
      return;
    }

    if (!params.id) {
      error = "Invalid learning module ID";
      loading = false;
      return;
    }

    loading = true;
    error = null;

    try {
      console.log("params id ", params.id);
      path = await learningPathService.getLearningModule(params.id);
    } catch (err) {
      console.error("Failed to fetch learning module:", err);
      error = "Failed to load learning module. Please try again later.";
    } finally {
      loading = false;
    }
  }
  function handleModuleComplete(moduleId: string) {
    if (!path) return;

    path.modules = path.modules.map((m) =>
      m.id === moduleId ? { ...m, completed: true } : m
    );

    // Recalculate progress
    const completedModules = path.modules.filter((m) => m.completed).length;
    path.progress = Math.round((completedModules / path.modules.length) * 100);
  }
</script>

<div class="max-w-6xl mx-auto px-4 py-8">
  {#if loading}
    <div class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
      ></div>
    </div>
  {:else if path}
    <!-- Course Header -->
    <div class="mb-8">
      <div class="flex items-center space-x-4 mb-4">
        <h1 class="text-3xl font-bold text-gray-900">{path.title}</h1>
        <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
          {path.progress}% Complete
        </span>
      </div>
      <p class="text-gray-600 text-lg">{path.description}</p>
    </div>

    <!-- Progress Bar -->
    <div class="w-full bg-gray-200 rounded-full h-2 mb-8">
      <div
        class="bg-primary h-2 rounded-full transition-all duration-500"
        style="width: {path.progress}%"
      ></div>
    </div>

    <!-- Course Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Modules List -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-lg">
          {#each path.modules as module, index (module.id)}
            <ModuleAccordion
              {module}
              moduleNumber={index + 1}
              isOpen={currentModuleId === module.id}
              on:toggleComplete={() => handleModuleComplete(module.id)}
            />
          {/each}
        </div>
      </div>

      <!-- Course Info Sidebar -->
      <div class="space-y-6">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">Course Information</h3>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-600">Total Duration</p>
              <p class="font-medium">12 hours</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Modules</p>
              <p class="font-medium">{path.modules.length} modules</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Last Accessed</p>
              <p class="font-medium">
                {new Date(path.lastAccessed).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold mb-4">Your Progress</h3>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-600">Completed Modules</p>
              <p class="font-medium">
                {path.modules.filter((m) => m.completed).length} of {path
                  .modules.length}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-600">Overall Progress</p>
              <p class="font-medium text-primary">{path.progress}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="text-center py-12">
      <h2 class="text-2xl font-bold text-gray-900">Learning path not found</h2>
      <a href="/#/dashboard" class="text-primary hover:underline"
        >Return to Dashboard</a
      >
    </div>
  {/if}
</div>
