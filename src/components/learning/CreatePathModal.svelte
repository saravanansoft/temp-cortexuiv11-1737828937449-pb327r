<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { generateLearningPath } from "../../lib/services/aiService";
  import {
    fetchTopics,
    fetchSubtopics,
    fetchAreas,
  } from "../../lib/services/topicsService";
  import type { Topic, SubTopic, Area } from "../../lib/data/topicsData";
  import type { LearningPath } from "../../lib/data/mockLearningPaths";
  import type { GenerateLearningPathRequest } from "../../lib/interfaces/learning-path.interface";
  import { useAuth } from "../../lib/hooks/useAuth";
  import { learningPathService } from "../../lib/services/learningPathService";

  const dispatch = createEventDispatcher<{
    close: void;
    pathCreated: LearningPath;
  }>();

  let loading = false;
  let topics: Topic[] = [];
  let subtopics: SubTopic[] = [];
  let areas: Area[] = [];

  let selectedTopic = "";
  let selectedSubtopic = "";
  let selectedArea = "";
  let description = "";
  let user_level: "beginner" | "intermediate" | "advanced" = "beginner";

  let loadingTopics = true;
  let loadingSubtopics = false;
  let loadingAreas = false;

  const { getUserId } = useAuth();

  onMount(async () => {
    try {
      topics = await fetchTopics();
      console.log("Topics:", topics);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    } finally {
      loadingTopics = false;
    }
  });

  async function handleTopicChange() {
    if (!selectedTopic) {
      subtopics = [];
      areas = [];
      return;
    }

    loadingSubtopics = true;
    selectedSubtopic = "";
    selectedArea = "";
    areas = [];

    try {
      subtopics = await fetchSubtopics(selectedTopic);
    } catch (error) {
      console.error("Failed to fetch subtopics:", error);
    } finally {
      loadingSubtopics = false;
    }
  }

  async function handleSubtopicChange() {
    if (!selectedSubtopic) {
      areas = [];
      return;
    }

    loadingAreas = true;
    selectedArea = "";

    try {
      areas = await fetchAreas(selectedTopic, selectedSubtopic);
    } catch (error) {
      console.error("Failed to fetch areas:", error);
    } finally {
      loadingAreas = false;
    }
  }

  async function handleSubmit() {
    if (!selectedTopic || !selectedSubtopic || !selectedArea) {
      return;
    }

    const userId = getUserId();
    console.log("This is User ID", userId);
    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    loading = true;

    try {
      const selectedTopicData = topics.find((t) => t.id === selectedTopic);
      const selectedSubtopicData = subtopics.find(
        (s) => s.id === selectedSubtopic
      );
      const selectedAreaData = areas.find((a) => a.id === selectedArea);

      const request: GenerateLearningPathRequest = {
        topic: selectedTopicData?.name || "",
        subtopic: selectedSubtopicData?.name,
        area: selectedAreaData?.name,
        description,
        user_level,
        preferredDuration: 1200, // 20 hours in minutes
        learningStyle: "visual",
      };

      const aiResponse = await generateLearningPath(request);
      console.log("AI Response", aiResponse);

      const newPath: LearningPath = {
        title: selectedTopicData?.name || "",
        description: selectedTopicData?.description || "",
        progress: 0,
        created: new Date(),
        lastAccessed: new Date(),
        userId: userId,
        modules: aiResponse.modules.map((m, index) => ({
          id: index + 1,
          title: m.title,
          description: m.description,
          topics: m.topics.map((t, index) => ({
            topic: {
              id: index + 1,
              title: t.title,
              duration: t.duration,
              completed: false,
            },
          })),
          completed: false,
        })),
        aiGenerated: true,
      };
      console.log("this is the new path", newPath);
      // Store the learning path in MongoDB
      const savedPath = await learningPathService.createLearningPath(newPath);
      console.log("saved path", savedPath);
      dispatch("pathCreated", newPath);
    } catch (error) {
      console.error("Failed to create learning path:", error);
    } finally {
      loading = false;
    }
  }
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
>
  <div class="bg-white rounded-lg max-w-2xl w-full p-6">
    <h2 class="text-2xl font-bold mb-6">Create Learning Path</h2>

    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <!-- Topic Selection -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Area of Interest
        </label>
        <div class="relative">
          <select
            bind:value={selectedTopic}
            on:change={handleTopicChange}
            class="input-field"
            required
            disabled={loadingTopics}
          >
            <option value="">Select an area</option>
            {#each topics as topic}
              <option value={topic.id}>{topic.name}</option>
            {/each}
          </select>
          {#if loadingTopics}
            <div class="absolute right-2 top-2">
              <div
                class="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"
              ></div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Subtopic Selection -->
      {#if selectedTopic}
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Specific Area
          </label>
          <div class="relative">
            <select
              bind:value={selectedSubtopic}
              on:change={handleSubtopicChange}
              class="input-field"
              required
              disabled={loadingSubtopics}
            >
              <option value="">Select a specific area</option>
              {#each subtopics as subtopic}
                <option value={subtopic.id}>{subtopic.name}</option>
              {/each}
            </select>
            {#if loadingSubtopics}
              <div class="absolute right-2 top-2">
                <div
                  class="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"
                ></div>
              </div>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Area Selection -->
      {#if selectedSubtopic}
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Focus Area
          </label>
          <div class="relative">
            <select
              bind:value={selectedArea}
              class="input-field"
              required
              disabled={loadingAreas}
            >
              <option value="">Select a focus area</option>
              {#each areas as area}
                <option value={area.id}>{area.name}</option>
              {/each}
            </select>
            {#if loadingAreas}
              <div class="absolute right-2 top-2">
                <div
                  class="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"
                ></div>
              </div>
            {/if}
          </div>
          {#if selectedArea}
            <p class="mt-2 text-sm text-gray-600">
              {areas.find((a) => a.id === selectedArea)?.description}
            </p>
          {/if}
        </div>
      {/if}

      <!-- Difficulty Selection -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Difficulty Level
        </label>
        <select bind:value={user_level} class="input-field" required>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <!-- Additional Information -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Any specific goals or requirements?
        </label>
        <textarea
          bind:value={description}
          class="input-field h-24 resize-none"
          placeholder="Describe your learning goals..."
          required
        ></textarea>
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          class="btn-secondary"
          on:click={() => dispatch("close")}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          class="btn-primary min-w-[120px]"
          disabled={loading || !selectedArea}
        >
          {loading ? "Creating..." : "Create Path"}
        </button>
      </div>
    </form>
  </div>
</div>
