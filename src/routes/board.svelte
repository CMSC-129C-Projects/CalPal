<script context="module">
  export async function preload(page, session) {
    const userId = session.user_id;

    if (!session.user_id || !session.did_cards_load) {
      return this.redirect(302, "/");
    }

    console.debug("[board.svelte] Trying to post...");
    await this.fetch(`/api/card/update?user=${userId}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lists: session.lists,
        archived_cards: session.archived_cards,
        calendars: session.calendars,
      }),
    });
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import Header from "../components/Header.svelte";
  import Board from "../components/Board.svelte";
  import Calendar from "../components/Calendar.svelte";
  import Reminder from "../components/Reminder.svelte";

  const { session } = stores();

  let is_board_shown = true;
</script>

<svelte:head>
  <title>CalPal</title>
</svelte:head>

<div class="index-parent">
  <Header bind:is_board_shown />
  {#if is_board_shown}
    <Board />
  {:else}
    <Calendar />
  {/if}
  <div class="alert-area">
    <div class="alert-flexbox-container">
      {#if $session.lists && $session.lists.length > 0}
        {#each $session.lists as list, i (i)}
          {#each list.cards.filter((c) => {
            return !(typeof c.card_name === "undefined" || c.is_archived);
          }) as card (card._id)}
            <Reminder bind:card />
          {/each}
          {#each list.cards.filter((f) => {
            return !(typeof f.folder_name === "undefined");
          }) as folder (folder._id)}
            {#each folder.cards.filter((c) => {
              return !(typeof c.card_name === "undefined" || c.is_archived);
            }) as card (card._id)}
              <Reminder bind:card />
            {/each}
          {/each}
        {/each}
      {/if}
    </div>
  </div>
</div>

<style>
  .index-parent {
    display: flex;
    flex-direction: column;
    height: inherit;
  }

  .alert-area {
    position: fixed;
    bottom: 20px;
    left: 10px;
    margin: none;
    width: 400px;
    opacity: 0.85;
    color: rgba(255, 255, 255, 0.9);
    z-index: 1031; /* Render on top of Calendar */
  }

  .alert-flexbox-container {
    display: flex;
    flex-direction: column;
    overflow-x: none;
    overflow-y: auto;
    max-height: 255px;
  }
</style>
