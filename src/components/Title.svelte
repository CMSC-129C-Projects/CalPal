<script>
  import { tick } from "svelte";
  import { Input } from "sveltestrap";

  export let value;
  export let untitledString = "";
  export let disabled = false;

  let inner;
  let isSelected = false;

  $: isUntitled = value === untitledString;

  async function handleOnClick(_event) {
    if (disabled) {
      return;
    }
    isSelected = true;
    await tick();

    inner.focus();
    inner.select();
  }

  const handleKeydown = async (event) => {
    if (event.key === "Enter") {
      await onBlur();
    }
  };

  const onFocus = () => {
    isSelected = true;
    if (value === untitledString) {
      value = "";
    }
    resize();
  };

  const onBlur = async () => {
    isSelected = false;
    value = value.trim();
    if (value === "") {
      value = untitledString;
    }
  };

  const resize = () => {
    inner.style.height = "auto";
    inner.style.height = `${4 + inner.scrollHeight}px`;
  };
</script>

<div class="title-parent">
  {#if isSelected}
    <Input
      class="title-title {isUntitled ? 'title-untitled' : ''}"
      type="textarea"
      maxlength="64"
      bind:value
      bind:inner
      on:focus={() => onFocus()}
      on:blur={() => onBlur()}
      on:keydown={(e) => handleKeydown(e)}
      on:input={() => resize()}
    />
  {:else}
    <div
      class="title-title {isUntitled ? 'title-untitled' : ''}"
      on:click={(e) => handleOnClick(e)}
    >
      {value}
    </div>
  {/if}
</div>

<style>
  .title-parent :global(.title-untitled) {
    color: rgba(0, 0, 0, 0.5);
  }

  .title-parent :global(.title-title) {
    font-weight: bold;
    font-size: 1.25em;
    margin: 0px 0px 0px 0px;
    padding: 0%;
    overflow-wrap: anywhere;
    hyphens: auto;
  }
</style>
