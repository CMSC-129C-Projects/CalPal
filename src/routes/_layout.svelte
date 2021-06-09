<script context="module">
  import { syncCards } from "./util/_sync";

  export async function preload(_page, session) {
    if (session.did_cards_load) {
      await syncCards(session, this.fetch);
    }
  }
</script>

<script>
  import { overrideItemIdKeyNameBeforeInitialisingDndZones } from "svelte-dnd-action";

  overrideItemIdKeyNameBeforeInitialisingDndZones("_id");
</script>

<main>
  <slot />
</main>

<style>
  main {
    position: relative;
    max-width: 100%;
    background-color: white;
    margin: 0 auto;
    box-sizing: border-box;
    height: 100vh;
  }
</style>
