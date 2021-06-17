<script context="module">
  import { syncCards } from "./util/_sync";

  export async function preload(_page, session) {
    if (session.did_cards_load) {
      try {
        const res = await this.fetch(`/api/card/${session.user_id}.json`);
        if (!res.ok) {
          throw new Error("Could not retrieve user data");
        }

        const userData = await res.json();
        for (const key in userData) {
          session[key] = userData[key];
        }

        await syncCards(session, this.fetch);
      } catch (err) {
        console.error(err);
      }
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
