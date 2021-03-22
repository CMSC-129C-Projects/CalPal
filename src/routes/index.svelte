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
  export let userCards;
</script>

<svelte:head>
  <title>CalPal</title>
</svelte:head>

{#if userCards}
  <code>{JSON.stringify(userCards)}</code>
{:else}
  <p>Could not get cards.</p>
{/if}

<style>
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
