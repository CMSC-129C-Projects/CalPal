<script>
  import { fly } from "svelte/transition";
  import { Button } from "sveltestrap/src";

  export let show = false;
</script>

{#if show}
  <nav transition:fly={{ x: 250, opacity: 1 }}>
    <Button
      on:click={() => {
        show = false;
      }}>Close</Button
    >
  </nav>
{/if}

<style>
  nav {
    position: fixed;
    top: 6.1em;
    right: 0;
    height: 100%;
    padding: 2rem 1rem 0.6rem;
    border-left: 1px solid #aaa;
    background: #000;
    overflow-y: auto;
    width: 20rem;
    z-index: 1030;
  }
</style>
