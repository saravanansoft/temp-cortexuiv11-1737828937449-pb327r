<script lang="ts">
  import Router from "svelte-spa-router";
  import { routes } from "./routes";
  import Navbar from "./components/layout/Navbar.svelte";
  import Sidebar from "./components/layout/Sidebar.svelte";
  import { isAuthenticated, user } from "./lib/stores/auth";
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import LinkedInCallback from "./routes/LinkedInCallback.svelte"; // Import the new component


  // Protected routes that require authentication
  const protectedRoutes = [
    "/dashboard",
    "/profile",
    "/profile-settings",
    "/learning-paths",
  ];

  let currentPath = window.location.hash.slice(1) || "/";

  // Handle route protection
  $: if ($isAuthenticated === false && protectedRoutes.includes(currentPath)) {
    push("/login");
  }

  onMount(() => {
    // Listen for route changes
    window.addEventListener("hashchange", () => {
      currentPath = window.location.hash.slice(1);
    });
  });
  
  // Add a route for the LinkedIn callback
  routes["/linkedin-callback"] = LinkedInCallback; // Add to your routes object

</script>

<div class="min-h-screen bg-gray-50">
  <Navbar />
  {#if $isAuthenticated}
    <Sidebar />
    <main class="lg:ml-64 pt-16 transition-all duration-300">
      <div class="p-4 sm:p-6 lg:p-8">
        <Router {routes} />
      </div>
    </main>
  {:else}
    <main class="pt-16">
      <div class="p-4 sm:p-6 lg:p-8">
        <Router {routes} />
      </div>
    </main>
  {/if}
</div>

<style>
  :global(html) {
    background-color: theme("colors.gray.50");
  }
</style>
