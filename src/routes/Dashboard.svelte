<script lang="ts">
  import { onMount } from "svelte";
  import { mockLearningPaths } from "../lib/data/mockLearningPaths";
  import type { LearningPath } from "../lib/data/mockLearningPaths";
  import LearningPathCard from "../components/learning/LearningPathCard.svelte";
  import CreatePathModal from "../components/learning/CreatePathModal.svelte";
  import { learningPathService } from "../lib/services/learningPathService";
  import { useAuth } from "../lib/hooks/useAuth";
  import { push } from "svelte-spa-router";

  let learningPaths: LearningPath[] = [];
  let showCreateModal = false;
  let loading = true;
  let error: string | null = null;

  const { getUserId } = useAuth();

  onMount(async () => {
    // Simulate API call
    loadLearningPaths();
  });

  async function loadLearningPaths() {
    const userId = getUserId();
    if (!userId) {
      push("/login");
      return;
    }

    loading = true;
    error = null;

    try {
      console.log("getting learning paths");
      learningPaths = await learningPathService.getLearningPaths(userId);
    } catch (err) {
      console.error("Failed to fetch learning paths:", err);
      error = "Failed to load learning paths. Please try again later.";
    } finally {
      loading = false;
    }
  }
  function handleCreatePath() {
    showCreateModal = true;
  }

  function handlePathCreated(event: CustomEvent<LearningPath>) {
    loadLearningPaths();
    //learningPaths = [...learningPaths, event.detail];
    showCreateModal = false;
    //console.log("I am in Handle Path Created", learningPaths);
  }
</script>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Dashboard Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">
            My Learning Dashboard
          </h1>
          <p class="mt-2 text-gray-600">
            Track your progress and start new learning journeys
          </p>
        </div>
        <button
          class="btn-primary flex items-center space-x-2"
          on:click={handleCreatePath}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Create Learning Path</span>
        </button>
      </div>
    </div>

    <!-- Learning Paths Grid -->
    {#if loading}
      <div class="flex justify-center items-center h-64">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
        ></div>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each learningPaths as path}
          <LearningPathCard {path} />
        {/each}
      </div>
    {/if}
  </div>
</div>

{#if showCreateModal}
  <CreatePathModal
    on:close={() => (showCreateModal = false)}
    on:pathCreated={handlePathCreated}
  />
{/if}
