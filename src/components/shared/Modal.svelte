<script lang="ts">
  export let show = false;
  export let title: string;
  
  function handleClose() {
    show = false;
  }
</script>

{#if show}
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-xl font-semibold text-gray-900">{title}</h2>
        <button 
          class="text-gray-400 hover:text-gray-600"
          on:click={handleClose}
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-6">
        <slot />
      </div>
      
      <!-- Footer -->
      <div class="px-6 py-4 border-t border-gray-200">
        <slot name="footer" />
      </div>
    </div>
  </div>
{/if}