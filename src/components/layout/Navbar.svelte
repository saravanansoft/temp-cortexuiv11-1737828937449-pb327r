<script lang="ts">
  import { isAuthenticated, logout, user } from "../../lib/stores/auth";
  import { push } from "svelte-spa-router";
  import logo from "../../assets/Logo_CortexCatalyst.png";

  async function handleLogout() {
    await logout();
    push("/");
  }

  let isMenuOpen = false;
</script>

<nav
  class="bg-white shadow-lg fixed top-0 left-0 right-0 z-50 transition-all duration-200"
>
  <div class="w-full px-0 lg:px-4">
    <div class="flex justify-between items-center h-16">
      <!-- Logo and Brand -->
      <div class="flex-shrink-0 pl-4">
        <a href="/#/" class="flex items-center space-x-3 group">
          <div class="flex-shrink-0">
            <img
              src={logo}
              alt="Cortex Catalyst"
              class="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span
            class="text-lg sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent whitespace-nowrap"
          >
            Cortex Catalyst
          </span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center pr-4">
        {#if $isAuthenticated && $user}
          <div class="flex items-center space-x-6">
            <div
              class="flex items-center space-x-3 border-l pl-6 border-gray-200"
            >
              <div class="flex items-center space-x-2">
                {#if $user.photoURL}
                  <img
                    src={$user.photoURL}
                    alt={$user.name}
                    class="w-8 h-8 rounded-full border-2 border-slate-800/20"
                  />
                {:else}
                  <div
                    class="w-8 h-8 rounded-full bg-slate-800/10 flex items-center justify-center"
                  >
                    <span class="text-slate-800 font-medium">
                      {$user.name[0].toUpperCase()}
                    </span>
                  </div>
                {/if}
                <span class="text-gray-700 font-medium">{$user.name}</span>
              </div>
              <button
                on:click={handleLogout}
                class="text-gray-600 hover:text-slate-800 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        {:else}
          <div class="flex items-center space-x-4">
            <a
              href="/#/login"
              class="text-gray-600 hover:text-slate-800 transition-colors duration-200 font-medium"
            >
              Login
            </a>
            <a
              href="/#/signup"
              class="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Sign Up
            </a>
          </div>
        {/if}
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden pr-4">
        <button
          on:click={() => (isMenuOpen = !isMenuOpen)}
          class="text-gray-600 hover:text-slate-800 focus:outline-none p-2"
          aria-label="Toggle menu"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {#if isMenuOpen}
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            {:else}
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            {/if}
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    {#if isMenuOpen}
      <div class="md:hidden py-4 border-t border-gray-100">
        {#if $isAuthenticated && $user}
          <div class="space-y-4">
            <div class="flex items-center space-x-3 px-4">
              {#if $user.photoURL}
                <img
                  src={$user.photoURL}
                  alt={$user.name}
                  class="w-8 h-8 rounded-full border-2 border-slate-800/20"
                />
              {:else}
                <div
                  class="w-8 h-8 rounded-full bg-slate-800/10 flex items-center justify-center"
                >
                  <span class="text-slate-800 font-medium">
                    {$user.name[0].toUpperCase()}
                  </span>
                </div>
              {/if}
              <span class="text-gray-700 font-medium">{$user.name}</span>
            </div>
            <button
              on:click={() => {
                handleLogout();
                isMenuOpen = false;
              }}
              class="block w-full text-left px-4 py-2 text-gray-600 hover:text-slate-800 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        {:else}
          <div class="space-y-4 px-4">
            <a
              href="/#/login"
              class="block py-2 text-gray-600 hover:text-slate-800 transition-colors duration-200"
              on:click={() => (isMenuOpen = false)}
            >
              Login
            </a>
            <a
              href="/#/signup"
              class="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors block text-center"
              on:click={() => (isMenuOpen = false)}
            >
              Sign Up
            </a>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</nav>

<style>
  nav {
    backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.9);
  }
</style>
