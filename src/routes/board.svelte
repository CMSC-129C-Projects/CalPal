<script context="module">
  export async function preload(page, session) {
    const userId = session.user_id;

    if (!session.user_id || !session.did_cards_load) {
      return this.redirect(302, "/");
    }

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
