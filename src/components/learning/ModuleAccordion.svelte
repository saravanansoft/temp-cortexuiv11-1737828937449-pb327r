<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Module } from "../../lib/data/mockLearningPaths";
  import { fetchQuiz } from "../../lib/services/quizService";
  import QuizModal from "./QuizModal.svelte";

  export let module: Module;
  export let moduleNumber: number;
  export let isOpen = false;

  const dispatch = createEventDispatcher();

  let showQuiz = false;
  let quiz: any = null;
  let loading = false;

  async function handleStartQuiz() {
    loading = true;
    quiz = await fetchQuiz(module.id);
    loading = false;
    showQuiz = true;
  }

  function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }
</script>

<div class="border-b border-gray-200 last:border-b-0">
  <button
    class="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
    on:click={() => (isOpen = !isOpen)}
  >
    <div class="flex items-center space-x-4">
      <div
        class={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${module.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}
      >
        {#if module.completed}
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        {:else}
          {moduleNumber}
        {/if}
      </div>
      <div class="text-left">
        <h3 class="font-semibold text-gray-900">{module.title}</h3>
        <p class="text-sm text-gray-500">
          {formatDuration(45)} • {module.topics?.length || 5} topics
        </p>
      </div>
    </div>
    <svg
      class={`w-5 h-5 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  {#if isOpen}
    <div class="px-6 pb-4">
      <p class="text-gray-600 mb-4">{module.description}</p>

      <div class="space-y-3">
        {#each module.topics as item, i}
          <div
            class="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-gray-50"
          >
            <div class="flex items-center space-x-3">
              <span class="text-sm text-gray-500">{i + 1}.</span>
              <a
                href={`#/topic/${item.topic.id}`}
                class="text-primary hover:underline"
              >
                {item.topic.title}
              </a>
              <span class="text-sm text-gray-500"
                >{formatDuration(item.topic.duration)}</span
              >
            </div>
            {#if item.topic.completed}
              <span class="text-green-500 text-sm">Completed</span>
            {/if}
          </div>
        {/each}
      </div>

      <div class="flex justify-between mt-6 pt-4 border-t border-gray-100">
        <button
          class="btn-secondary"
          on:click={() => dispatch("toggleComplete")}
        >
          {module.completed ? "Mark Incomplete" : "Mark Complete"}
        </button>

        <button
          class="btn-primary flex items-center space-x-2"
          disabled={!module.completed || loading}
          on:click={handleStartQuiz}
        >
          {#if loading}
            <div
              class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            ></div>
            <span>Loading...</span>
          {:else}
            <span>Take Evaluation</span>
          {/if}
        </button>
      </div>
    </div>
  {/if}
</div>

{#if showQuiz && quiz}
  <QuizModal {quiz} on:close={() => (showQuiz = false)} />
{/if}
