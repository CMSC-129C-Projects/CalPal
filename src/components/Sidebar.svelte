<script>
  import { fly } from "svelte/transition";
  import { Button } from "sveltestrap/src";
  import { CardBody } from "sveltestrap/src";
  import { stores } from "@sapper/app";

  import ViewCard from "./ViewCard.svelte";

  const { session } = stores();

  export let show = false;
  export let id;
</script>

{#if show}
  <nav transition:fly={{ x: 250, opacity: 1 }}>
    <Button
      on:click={() => {
        show = false;
      }}>Close</Button
    >
    <CardBody>
      {#each $session.archived_cards as archived_card (archived_card._id)}
        <ViewCard
          bind:card={archived_card}
          id="{id}-archived-card-{archived_card._id}"
        />
      {/each}
    </CardBody>
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
