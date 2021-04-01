<script context="module">
  import { getCardsOfUser } from "./cards/_database.js";

  export async function preload(page, session) {
    const userId = "1";
    const cardData = await getCardsOfUser(userId);
    console.debug(`[index.svelte] cardData: ${JSON.stringify(cardData)}`);

    console.debug("[index.svelte] Attemping POST...");
    console.debug(
      `[index.svelte] POST body: ${JSON.stringify({
        user_id: userId,
        cards: cardData,
      })}`
    );
    await this.fetch(`cards/${userId}.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        // cards: cardData,
      }),
    }).then((post_res) => {
      if (post_res.ok) {
        console.debug(`[index.svelte] POST success!`);
      } else {
        console.debug(`[index.svelte] POST failed.`);
        this.error(post_res.status, post_res.message);
        // throw new Error(`POST response failed: ${JSON.stringify(r)}`);
      }
    });
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import Board from "../components/Board.svelte";

  const { session } = stores();

  export let userCards;

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
