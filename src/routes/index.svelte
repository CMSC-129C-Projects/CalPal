<script context="module">
  export async function preload(_page, session) {
    const userId = 1;
    if (session.did_cards_load) {
      await this.fetch(`cards/${userId}-update.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lists: session.lists,
          archived_cards: session.archived_cards,
        }),
      }).then((res) => {
        if (res.ok) {
          if (res.modifiedCount > 0) {
            console.debug(`[index.svelte] Successfully updated lists!`);
          } else {
            console.debug(`[index.svelte] No changes were made.`);
          }
        }
      });
    }
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import Board from "../components/Board.svelte";
  import Calendar from "../components/Calendar.svelte";
  import NavBar from "../components/Calendar.svelte";

  const { session } = stores();

  export let is_board_shown;
</script>

<svelte:head>
  <title>CalPal</title>
</svelte:head>

<div class="parent">
  {#if $session}
    {#if is_board_shown}
      <Board />
    {:else}
      <Calendar />
    {/if}
  {:else}
    <p>Could not get cards.</p>
  {/if}
  <!-- <NavBar bind:is_board_shown /> -->
</div>

<style>
  .parent {
    height: inherit;
  }

  p {
    text-align: center;
  }
</style>
