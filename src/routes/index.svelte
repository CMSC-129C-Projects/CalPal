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

      const objectId = await this.fetch("cards/new-oid.json")
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            this.error(res.status, res.json().message);
          }
        })
        .catch((err) => {
          this.error(err);
        });
      console.debug(`[index.svelte] objectId: ${JSON.stringify(objectId)}`);

      await this.fetch("cards/new-oid.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_object_id: objectId }),
      })
        .then((res) => {
          if (res.ok) {
            session.new_object_id = objectId.new_object_id;
          } else {
            this.error(res.status, res.json().message);
          }
        })
        .catch((err) => {
          this.error(err);
        });
    }
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import Board from "../components/Board.svelte";

  const { session } = stores();
</script>

<svelte:head>
  <title>CalPal</title>
</svelte:head>

<div class="parent">
  {#if $session}
    <Board />
  {:else}
    <p>Could not get cards.</p>
  {/if}
</div>

<style>
  .parent {
    height: inherit;
  }

  p {
    text-align: center;
  }
</style>
