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
  import Reminder from "../components/Reminder.svelte";

  const { session } = stores();
  export let id;
  let is_board_shown = true;
</script>

<svelte:head>
  <title>CalPal</title>
</svelte:head>

<div class="index-parent">
  <Header bind:is_board_shown />
  {#if $session}
    {#if is_board_shown}
      <Board />
    {:else}
      <Calendar />
    {/if}
    <div class="alert-area">
      <div class="alert-flexbox-container">
        {#each $session.lists as list, i (i)}
          {#each list.cards.filter((c) => {
            return !(typeof c.card_name === "undefined" || c.is_archived);
          }) as card, j (card)}
            <Reminder bind:card id="{id}-card-{j}" />
          {/each}
        {/each}
      </div>
    </div>
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
  .alert-area {
    position: fixed;
    bottom: 20px;
    left: 10px;
    margin: none;
    width: 400px;
    opacity: 0.85;
    color: rgba(255, 255, 255, 0.9);
  }

  .alert-flexbox-container {
    display: flex;
    flex-direction: column;
    overflow-x: none;
    overflow-y: auto;
    max-height: 255px;
  }
</style>
