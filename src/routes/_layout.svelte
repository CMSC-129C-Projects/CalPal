<script>
  import Header from "../components/Header.svelte";
  export let segment;
</script>

<main>
  <Header />
  <slot />
</main>

<style>
  main {
    position: relative;
    max-width: 100%;
    background-color: white;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
