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
  import Header from "../components/Header.svelte";
  import Board from "../components/Board.svelte";
  import Calendar from "../components/Calendar.svelte";
  import { getContext } from "svelte";

  const { session } = stores();
  const is_board_shown_store = getContext("is_board_shown");

  $: is_board_shown = $is_board_shown_store;
</script>

<svelte:head>
  <title>CalPal</title>
</svelte:head>

<div class="index-parent">
  <Header />
  {#if $session}
    {#if is_board_shown}
      <Board />
    {:else}
      <Calendar />
    {/if}
  {:else}
    <p>Could not get cards.</p>
  {/if}
</div>

<style>
  .index-parent {
    display: flex;
    flex-direction: column;
    height: inherit;
  }

  p {
    text-align: center;
  }
</style>
