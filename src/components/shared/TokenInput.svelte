<script lang="ts">
  export let tokens: string[] = [];
  export let placeholder = '';
  export let maxTokens = 10;

  let inputValue = '';

  function addToken(value: string) {
    const trimmedValue = value.trim();
    if (trimmedValue && !tokens.includes(trimmedValue) && tokens.length < maxTokens) {
      tokens = [...tokens, trimmedValue];
    }
    inputValue = '';
  }

  function removeToken(index: number) {
    tokens = tokens.filter((_, i) => i !== index);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addToken(inputValue);
    } else if (event.key === 'Backspace' && !inputValue && tokens.length > 0) {
      removeToken(tokens.length - 1);
    }
  }

  function handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text');
    if (pastedText) {
      const values = pastedText.split(/[,\n]/);
      values.forEach(value => addToken(value));
    }
  }
</script>

<div class="relative">
  <div class="input-field min-h-[42px] flex flex-wrap gap-2 p-2">
    {#each tokens as token, index}
      <span class="inline-flex items-center bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm">
        {token}
        <button
          type="button"
          class="ml-2 text-primary-600 hover:text-primary-800"
          on:click={() => removeToken(index)}
        >
          ×
        </button>
      </span>
    {/each}
    <input
      type="text"
      bind:value={inputValue}
      {placeholder}
      class="flex-1 min-w-[120px] border-none p-1 focus:ring-0 text-sm"
      on:keydown={handleKeydown}
      on:paste={handlePaste}
      on:blur={() => addToken(inputValue)}
    />
  </div>
  <p class="mt-1 text-sm text-gray-500">
    Press Enter or comma to add. {maxTokens - tokens.length} remaining.
  </p>
</div>