<script>
  import { fly } from "svelte/transition";
  import { Button, Container } from "sveltestrap/src";
  import { CardBody } from "sveltestrap/src";
  import { stores } from "@sapper/app";

  import ViewCard from "./ViewCard.svelte";

  const { session } = stores();

  export let show = false;
  export let id;
</script>

{#if show}
  <nav class="sidebar-area" transition:fly={{ x: 250, opacity: 1 }}>
    <CardBody>
      {#each $session.lists as list, i (i)}
        {#each list.cards.filter((c) => {
          return !(typeof c.card_name === "undefined" || !c.is_archived);
        }) as card, j (card)}
          <ViewCard bind:card id="{id}-card-{j}" />
        {/each}
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
