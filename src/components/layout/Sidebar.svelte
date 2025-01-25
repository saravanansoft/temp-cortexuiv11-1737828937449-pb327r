<script lang="ts">
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";

  const menuItems = [
    {
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      label: "Profile Settings",
      path: "/profile-settings",
    },
    {
      icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
      label: "Trending paths",
      path: "/learning-paths",
    },
  ];

  let currentPath = "/dashboard";
  let isSidebarOpen = false;
  let isDesktop = false;

  function handleResize() {
    isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      isSidebarOpen = true;
    } else {
      isSidebarOpen = false;
    }
  }

  onMount(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  function handleNavigation(path: string) {
    currentPath = path;
    push(path);
    if (!isDesktop) {
      isSidebarOpen = false;
    }
  }
</script>

<!-- Mobile Toggle Button -->
<div class="lg:hidden fixed bottom-4 right-4 z-50">
  <button
    class="bg-slate-800 text-white p-3 rounded-full shadow-lg hover:bg-slate-700 transition-colors"
    on:click={() => (isSidebarOpen = !isSidebarOpen)}
    aria-label="Toggle sidebar"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {#if isSidebarOpen}
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

<!-- Sidebar -->
<aside
  class="sidebar {isSidebarOpen
    ? 'translate-x-0'
    : '-translate-x-full'} lg:translate-x-0"
  style="margin-top: 4rem;"
>
  <div class="flex flex-col h-full">
    <!-- <div class="p-4 border-b border-slate-700">
      <h1 class="text-2xl font-bold text-white">My Path</h1>
    </div> -->

    <nav class="flex-1 overflow-y-auto p-4">
      <ul class="space-y-1">
        {#each menuItems as item}
          <li>
            <button
              class="sidebar-link {currentPath === item.path ? 'active' : ''}"
              on:click={() => handleNavigation(item.path)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d={item.icon}
                />
              </svg>
              <span>{item.label}</span>
            </button>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</aside>

<!-- Backdrop Overlay -->
{#if isSidebarOpen && !isDesktop}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
    on:click={() => (isSidebarOpen = false)}
  ></div>
{/if}
