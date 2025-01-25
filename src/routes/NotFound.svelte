<script lang="ts">
  import { push } from 'svelte-spa-router';
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="text-center">
    <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
    <p class="text-xl text-gray-600 mb-8">Page not found</p>
    <button
      class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      on:click={() => push('/')}
    >
      Go Home
    </button>
  </div>
</div>