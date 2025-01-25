<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchTrendingPaths, toggleBookmark, addToLearningPath } from '../lib/services/trendingPathsService';
  import type { TrendingPath } from '../lib/data/trendingPaths';
  import { fetchTopics, fetchSubtopics, fetchAreas } from '../lib/services/topicsService';
  import type { Topic, SubTopic, Area } from '../lib/data/topicsData';

  let paths: TrendingPath[] = [];
  let loading = true;
  let topics: Topic[] = [];
  let subtopics: SubTopic[] = [];
  let areas: Area[] = [];

  let selectedTopic = '';
  let selectedSubtopic = '';
  let selectedArea = '';
  let selectedDifficulty = '';

  let loadingTopics = true;
  let loadingSubtopics = false;
  let loadingAreas = false;

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  onMount(async () => {
    try {
      [paths, topics] = await Promise.all([
        fetchTrendingPaths(),
        fetchTopics()
      ]);
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
    } finally {
      loading = false;
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
    selectedSubtopic = '';
    selectedArea = '';
    areas = [];

    try {
      subtopics = await fetchSubtopics(selectedTopic);
    } catch (error) {
      console.error('Failed to fetch subtopics:', error);
    } finally {
      loadingSubtopics = false;
    }

    applyFilters();
  }

  async function handleSubtopicChange() {
    if (!selectedSubtopic) {
      areas = [];
      return;
    }

    loadingAreas = true;
    selectedArea = '';

    try {
      areas = await fetchAreas(selectedTopic, selectedSubtopic);
    } catch (error) {
      console.error('Failed to fetch areas:', error);
    } finally {
      loadingAreas = false;
    }

    applyFilters();
  }

  async function applyFilters() {
    loading = true;
    try {
      paths = await fetchTrendingPaths({
        category: selectedTopic,
        subCategory: selectedSubtopic,
        area: selectedArea,
        difficulty: selectedDifficulty
      });
    } catch (error) {
      console.error('Failed to apply filters:', error);
    } finally {
      loading = false;
    }
  }

  async function handleBookmark(path: TrendingPath) {
    try {
      await toggleBookmark(path.id);
      paths = paths.map(p => 
        p.id === path.id ? { ...p, isBookmarked: !p.isBookmarked } : p
      );
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  }

  async function handleAddToLearningPath(path: TrendingPath) {
    try {
      await addToLearningPath(path.id);
      // Show success message or notification
    } catch (error) {
      console.error('Failed to add to learning path:', error);
    }
  }

  $: {
    if (selectedDifficulty || selectedArea) {
      applyFilters();
    }
  }
</script>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Trending Learning Paths</h1>
      <p class="mt-2 text-gray-600">Discover popular learning paths curated by experts and the community</p>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              disabled={loadingTopics}
            >
              <option value="">All Areas</option>
              {#each topics as topic}
                <option value={topic.id}>{topic.name}</option>
              {/each}
            </select>
            {#if loadingTopics}
              <div class="absolute right-2 top-2">
                <div class="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            {/if}
          </div>
        </div>

        <!-- Subtopic Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Specific Area
          </label>
          <div class="relative">
            <select
              bind:value={selectedSubtopic}
              on:change={handleSubtopicChange}
              class="input-field"
              disabled={loadingSubtopics || !selectedTopic}
            >
              <option value="">All Specific Areas</option>
              {#each subtopics as subtopic}
                <option value={subtopic.id}>{subtopic.name}</option>
              {/each}
            </select>
            {#if loadingSubtopics}
              <div class="absolute right-2 top-2">
                <div class="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            {/if}
          </div>
        </div>

        <!-- Area Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Focus Area
          </label>
          <div class="relative">
            <select
              bind:value={selectedArea}
              class="input-field"
              disabled={loadingAreas || !selectedSubtopic}
            >
              <option value="">All Focus Areas</option>
              {#each areas as area}
                <option value={area.id}>{area.name}</option>
              {/each}
            </select>
            {#if loadingAreas}
              <div class="absolute right-2 top-2">
                <div class="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            {/if}
          </div>
        </div>

        <!-- Difficulty Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Difficulty Level
          </label>
          <select
            bind:value={selectedDifficulty}
            class="input-field"
          >
            <option value="">All Levels</option>
            {#each difficulties as difficulty}
              <option value={difficulty}>{difficulty}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Learning Paths Grid -->
    {#if loading}
      <div class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each paths as path (path.id)}
          <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <!-- Image -->
            <div class="relative h-48">
              <img 
                src={path.thumbnail} 
                alt={path.title}
                class="w-full h-full object-cover"
              />
              <button
                class="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                on:click={() => handleBookmark(path)}
              >
                <svg
                  class="w-5 h-5 {path.isBookmarked ? 'text-primary' : 'text-gray-400'}"
                  fill={path.isBookmarked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium px-2 py-1 rounded-full {
                  path.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  path.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }">
                  {path.difficulty}
                </span>
                <div class="flex items-center text-sm text-gray-500">
                  <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {path.rating}
                </div>
              </div>

              <h3 class="text-xl font-semibold text-gray-900 mb-2">{path.title}</h3>
              <p class="text-gray-600 text-sm mb-4">{path.description}</p>

              <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{path.duration}</span>
                <span>{path.enrollments.toLocaleString()} enrolled</span>
              </div>

              <button
                class="btn-primary w-full flex items-center justify-center space-x-2"
                on:click={() => handleAddToLearningPath(path)}
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add to Learning Path</span>
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>