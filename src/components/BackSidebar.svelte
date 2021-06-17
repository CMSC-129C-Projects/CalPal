<script>
  import { Icon } from "sveltestrap";

  export let isCurrentMenuOpen;
  export let isSidebarOpen;

  const goBack = () => {
    isCurrentMenuOpen = !isCurrentMenuOpen;
    isSidebarOpen = true;
  };
</script>

<button
  on:click={() => {
    goBack();
  }}
>
  <Icon name="arrow-left" />
</button>

<style>
  button {
    background-color: transparent;
    color: #000;
    border: 0;
    border-radius: 0.25em;
    line-height: 0%;
    padding: 0%;
    font-size: 1.2em;
    text-align: center;
    text-decoration: none;
    opacity: 0.5;
    box-sizing: content-box;
    width: 1em;
    height: 1em;
  }

  button:hover {
    opacity: 0.75;
  }

  button:active {
    opacity: 1;
  }
</style>
