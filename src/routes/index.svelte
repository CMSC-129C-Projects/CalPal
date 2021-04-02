<script context="module">
  export async function preload(page, session) {
    const userId = 1;
    await this.fetch(`cards/${userId}-update.json.js`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lists: session.lists,
      }),
    }).then((res) => {
      if (res.ok) {
        console.debug(`[index.svelte] Successfully updated lists!`);
      }
    });
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import Board from "../components/Board.svelte";

  const { session } = stores();

  console.debug(`[index.svelte] Session: ${JSON.stringify($session)}`);
</script>

<svelte:head>
  <title>CalPal</title>
</svelte:head>

<div class="parent">
  {#if $session}
    <code>
      {JSON.stringify($session)}
    </code>
    <Board />
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
