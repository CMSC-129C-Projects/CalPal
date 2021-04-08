<script>
  import { tick } from "svelte";
  import { Input } from "sveltestrap/src";

  export let value;
  export let id;
  export let untitledString = "";

  let isSelected = false;

  $: isUntitled = value === untitledString;

  async function handleOnClick(event) {
    isSelected = true;
    await tick();

    const inputElement = document.getElementById(id);
    inputElement.focus();
  }

  async function handleKeydown(event) {
    if (event.key === "Enter") {
      await onBlur();
    }
  }

  async function onFocus() {
    isSelected = true;
    if (value === untitledString) {
      value = "";
    }
  }

  async function onBlur() {
    isSelected = false;
    value = value.trim();
    if (value === "") {
      value = untitledString;
    }
  }
</script>

<div class="parent">
  {#if isSelected}
    <Input
      {id}
      class="title {isUntitled ? 'untitled' : ''}"
      type="textarea"
      maxlength="64"
      bind:value
      on:focus={() => onFocus()}
      on:blur={() => onBlur()}
      on:keydown={(e) => handleKeydown(e)}
    />
  {:else}
    <div
      class="title {isUntitled ? 'untitled' : ''}"
      on:click={(e) => handleOnClick(e)}
    >
      {value}
    </div>
  {/if}
</div>

<style>
  .parent :global(.untitled) {
    color: #aaa;
  }

  .parent :global(.title) {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 1.25em;
    margin: 0px 0px 0px 0px;
    padding: 0%;
    overflow-wrap: anywhere;
    hyphens: auto;
  }
</style>
