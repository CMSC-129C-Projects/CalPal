<script context="module">
  export async function preload(_page, session) {
    session.did_cards_load = false;
  }
</script>

<main>
  <slot />
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
</style>
