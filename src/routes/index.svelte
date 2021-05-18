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
  import SignIn from "../components/SignIn.svelte";

  const { session } = stores();
</script>

<svelte:head>
  <title>CalPal</title>
</svelte:head>

<div class="index-parent">
  {#if $session.userToken}
    <Board />
  {:else}
    <div class="index-sign-in">
      <SignIn />
    </div>
  {/if}
</div>

<style>
  .index-parent {
    height: inherit;
  }

  .index-sign-in {
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
  }
</style>
