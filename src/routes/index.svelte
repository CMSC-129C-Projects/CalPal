<script context="module">
  export async function preload(_page, session) {
    const userId = session.user_id;
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
  import SignInInterface from "../components/SignInInterface.svelte";

  const { session } = stores();

  let isSignedIn = false;
</script>

<svelte:head>
  <title>CalPal</title>
</svelte:head>

<div class="index-parent">
  {#if $session.did_cards_load && isSignedIn}
    <Header {isSignedIn} />
    <Board />
  {:else}
    <div class="index-sign-in">
      <SignInInterface bind:isSignedIn />
    </div>
  {/if}
</div>

<style>
  .index-parent {
    display: flex;
    flex-direction: column;
    height: inherit;
  }

  .index-sign-in {
    display: flex;
    justify-content: center;
    align-items: center;
    height: inherit;
  }
</style>
