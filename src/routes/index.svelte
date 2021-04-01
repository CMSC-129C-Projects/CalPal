<script context="module">
  export async function preload() {
    const userId = 1;
    const res = await this.fetch(`cards/${userId}.json`);
    const data = await res.json();

    if (res.status === 200) {
      const post_res = await this.fetch(`cards/${userId}.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          cards: data,
        }),
      });
      if (post_res === 200) {
        console.debug("[index.svelte] POSTed!");
      } else {
        console.debug("[index.svelte] POST failed.");
      }
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { stores } from "@sapper/app";
  const { session } = stores();
  import Board from "../components/Board.svelte";
  export let userCards;

  console.debug(`[index.svelte] ${$session.user_id}`);
</script>

<svelte:head>
  <title>CalPal</title>
</svelte:head>

<div class="parent">
  {#if userCards}
    <Board lists={userCards.lists} />
  {:else}
    <p>Could not get cards.</p>
  {/if}
</div>

<style>
  .parent {
    height: inherit;
  }

  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>
