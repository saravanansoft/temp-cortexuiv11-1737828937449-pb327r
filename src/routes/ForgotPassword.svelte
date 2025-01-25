<script lang="ts">
  import { resetPassword } from "../lib/firebase";
  import { push } from "svelte-spa-router";

  let email = "";
  let error = "";
  let success = false;
  let loading = false;

  async function handleSubmit() {
    if (loading) return;

    loading = true;
    error = "";
    success = false;

    const result = await resetPassword(email);
    if (result.success) {
      success = true;
      email = "";
    } else {
      error = result.error || "Failed to send reset email";
    }

    loading = false;
  }
</script>

<div class="max-w-md mx-auto">
  <div class="card">
    <h2 class="text-2xl font-bold mb-6 text-center">Reset Password</h2>

    {#if success}
      <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p class="text-green-800 text-center">
          Password reset email sent! Please check your inbox.
        </p>
      </div>
    {/if}

    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          bind:value={email}
          class="input-field"
          required
          disabled={loading}
          placeholder="Enter your email address"
        />
      </div>

      {#if error}
        <p class="text-red-500 text-sm text-center">{error}</p>
      {/if}

      <button type="submit" class="btn-primary w-full" disabled={loading}>
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      <p class="text-center text-sm">
        <a href="/#/login" class="text-primary hover:underline">Back to Login</a
        >
      </p>
    </form>
  </div>
</div>
