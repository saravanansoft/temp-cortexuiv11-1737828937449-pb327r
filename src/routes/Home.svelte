<script lang="ts">
  import { push } from 'svelte-spa-router';
</script>

<div class="max-w-6xl mx-auto">
  <div class="text-center mb-16">
    <h1 class="text-5xl font-bold text-gray-900 mb-4">
      Your Personalized Learning Journey Starts Here ...
    </h1>
    <p class="text-xl text-gray-600 mb-8">
      Discover a smarter way to learn with AI-powered personalized learning paths
    </p>
    <button 
      class="btn-primary text-lg px-8 py-3"
      on:click={() => push('/signup')}
    >
      Get Started
    </button>
  </div>

  <div class="grid md:grid-cols-3 gap-8 mb-16">
    <div class="card text-center p-6">
      <h3 class="text-xl font-semibold mb-4">Personalized Learning</h3>
      <p class="text-gray-600">
        AI-driven content tailored to your unique learning style and goals
      </p>
    </div>
    <div class="card text-center p-6">
      <h3 class="text-xl font-semibold mb-4">Track Progress</h3>
      <p class="text-gray-600">
        Monitor your learning journey with detailed analytics and insights
      </p>
    </div>
    <div class="card text-center p-6">
      <h3 class="text-xl font-semibold mb-4">Expert Guidance</h3>
      <p class="text-gray-600">
        Get recommendations from our AI system to optimize your learning path
      </p>
    </div>
  </div>
</div>