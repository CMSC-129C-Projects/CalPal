<script context="module">
  export async function preload(page, session) {
    const userId = session.user_id;

    if (!session.user_id || !session.did_cards_load) {
      return this.redirect(302, "/");
    }

    console.debug("[board.svelte] Trying to post...");
    await this.fetch(`cards/${userId}-update.json`, {
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
  import Header from "../components/Header.svelte";
  import Board from "../components/Board.svelte";
</script>

<svelte:head>
  <title>CalPal</title>
</svelte:head>

<div class="index-parent">
  <Header />
  <Board />
</div>

<style>
  .index-parent {
    display: flex;
    flex-direction: column;
    height: inherit;
  }
</style>
