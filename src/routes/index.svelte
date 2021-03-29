<script context="module">
  export async function preload() {
    const res = await this.fetch(`cards/1.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { userCards: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import Board from "../components/Board.svelte";
  export let userCards;
</script>

<svelte:head>
  <title>CalPal</title>
</svelte:head>

<div class="parent">
  {#if userCards}
    <Board />
  {:else}
    <p>Could not get cards.</p>
  {/if}
</div>

<style>
  .parent {
    margin-left: 1.5em;
    margin-right: 1.5em;
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
