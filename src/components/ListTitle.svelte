<script>
  import { tick } from "svelte";
  import { Input } from "sveltestrap/src";

  export let value;
  export let id;

  let isSelected = false;
  $: {
    console.debug(`[ListTitle.svelte] isSelected = ${isSelected}`);
  }

  const untitledListString = "Untitled List";
  let isUntitledList = false;
  $: isUntitledList = value === untitledListString;

  async function handleOnClick(event) {
    isSelected = true;
    await tick();

    const listTitleField = document.getElementById(id);
    listTitleField.focus();
  }

  async function handleKeydown(event) {
    if (event.key === "Enter") {
      isSelected = false;
      if (value === "") {
        value = untitledListString;
      }
    }
  }

  async function onFocus() {
    isSelected = true;
    if (value === untitledListString) {
      value = "";
    }
  }

  async function onBlur() {
    isSelected = false;
    if (value === "") {
      value = untitledListString;
    }
  }
</script>

<div class="parent">
  {#if isSelected}
    <Input
      {id}
      class="listTitle {isUntitledList ? 'untitledList' : ''}"
      type="textarea"
      maxlength="64"
      bind:value
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
  }
</style>
