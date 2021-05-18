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

  const { session } = stores();

  const getCardsFromUrl = async () => {
    const url = `https://vle.upcebu.edu.ph/calendar/export_execute.php?userid=838&authtoken=e87b053d9db022747e689dc55896cf1d58185a73&preset_what=all&preset_time=weeknow`;
    // const url = `https://calendar.google.com/calendar/embed?src=c_classroom4d0ef89c%40group.calendar.google.com&ctz=Asia%2FManila`;
    const encodedUrl = encodeURIComponent(url);
    console.debug(`[index.svelte] encodedUrl: ${encodedUrl}`);

    const response = await fetch(`/api/ical/parse.json?url=${encodedUrl}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.debug(result);
  };
</script>

<svelte:head>
  <title>CalPal</title>
</svelte:head>

<div class="index-parent">
  <button
    on:click={() => {
      getCardsFromUrl();
    }}
  >
    Get cards from URL
  </button>
  <Header />
  {#if $session}
    <Board />
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
