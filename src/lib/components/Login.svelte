<script lang="ts">
  import { loginWithSocial } from "../stores/auth";
  import { push } from "svelte-spa-router";

  let loading = false;
  let error = "";

  async function handleSocialLogin(provider: "google" | "facebook") {
    loading = true;
    error = "";

    const result = await loginWithSocial(provider);
    if (result.success) {
      push("/dashboard");
    } else {
      error = result.error || `${provider} login failed`;
    }

    loading = false;
  }
</script>

<div
  class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
>
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in with Social Media
      </h2>
    </div>

    {#if error}
      <div class="text-red-500 text-sm text-center">{error}</div>
    {/if}

    <div class="mt-6 space-y-4">
      <button
        type="button"
        on:click={() => handleSocialLogin("google")}
        disabled={loading}
        class="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        {#if loading}
          Loading...
        {:else}
          Continue with Google
        {/if}
      </button>

      <button
        type="button"
        on:click={() => handleSocialLogin("facebook")}
        disabled={loading}
        class="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {#if loading}
          Loading...
        {:else}
          Continue with Facebook
        {/if}
      </button>
    </div>
  </div>
</div>
