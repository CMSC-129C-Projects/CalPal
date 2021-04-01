<script context="module">
  export async function preload() {
    const userId = 1;
    const res = await this.fetch(`cards/${userId}.json`);
    const data = await res.json();

    if (res.status === 200) {
      await this.fetch(`cards/${userId}.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          cards: data,
        }),
      })
        .then((r) => {
          if (r.ok) {
            console.debug(`[index.svelte] POST success!`);
          } else {
            throw new Error(`POST response failed: ${JSON.stringify(r)}`);
          }
        })
        .catch((e) => {
          console.debug(`[index.svelte] POST failed. ${e}`);
        });
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

  console.debug(`[index.svelte] ${JSON.stringify($session)}`);
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
