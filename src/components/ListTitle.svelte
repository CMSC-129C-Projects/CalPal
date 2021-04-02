<script>
  import { tick, onMount } from "svelte";
  import { Input } from "sveltestrap/src";

  export let value;
  let inputElement;
  let isMounted = false;

  let isSelected = false;
  $: {
    console.debug(`[ListTitle.svelte] isSelected = ${isSelected}`);
  }

  const untitledListString = "Untitled List";
  let isUntitledList = false;
  $: isUntitledList = value === untitledListString;

  async function handleOnClick(event) {
    if (!isMounted) {
      return;
    }
    isSelected = true;
    await tick();

    inputElement.focus();
  }

  async function handleKeydown(event) {
    if (!isMounted) {
      return;
    }
    if (event.key === "Enter") {
      await onBlur();
    }
  }

  async function onFocus() {
    if (!isMounted) {
      return;
    }
    isSelected = true;
    if (value === untitledListString) {
      value = "";
    }
  }

  async function onBlur() {
    if (!isMounted) {
      return;
    }
    isSelected = false;
    value = value.trim();
    if (value === "") {
      value = untitledListString;
    }
  }

  onMount(() => {
    isMounted = true;
  });
</script>

<div class="parent">
  {#if isSelected}
    <Input
      class="listTitle {isUntitledList ? 'untitledList' : ''}"
      type="textarea"
      maxlength="64"
      bind:value
      bind:this={inputElement}
      on:focus={() => onFocus()}
      on:blur={() => onBlur()}
      on:keydown={(e) => handleKeydown(e)}
    />
  {:else}
    <div
      class="listTitle {isUntitledList ? 'untitledList' : ''}"
      on:click={(e) => handleOnClick(e)}
    >
      {value}
    </div>
  {/if}
</div>

<style>
  .parent :global(.untitledList) {
    color: #aaa;
  }

  .parent :global(.listTitle) {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 1.25em;
    margin: 0px 0px 0px 0px;
    padding: 0%;
    overflow-wrap: anywhere;
    hyphens: auto;
  }
</style>
