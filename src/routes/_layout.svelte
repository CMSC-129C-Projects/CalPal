<script>
  import Header from "../components/Header.svelte";
  export let segment;
</script>

<main>
  <div class="fill">
    <Header />
    <slot />
  </div>
</main>

<style>
  main {
    position: relative;
    max-width: 100%;
    background-color: white;
    margin: 0 auto;
    box-sizing: border-box;
    height: 100vh;
  }

  .fill {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* slot {
    height: 100%;
  } */
</style>
