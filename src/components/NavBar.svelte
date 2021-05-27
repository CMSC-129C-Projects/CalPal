<script>
  import AddCalendar from "./AddCalendar.svelte";
  import MenuSidebar from "./MenuSidebar.svelte";

  export let is_board_shown;

  function handleViewButton() {
    is_board_shown = !is_board_shown;
  }
</script>

<div class="parent">
  <AddCalendar />
  <button class="scale-on-hover borderless-button" on:click={handleViewButton}>
    <img src="switch_board_view.png" alt="Board view" />
  </button>
  <MenuSidebar />
</div>

<style>
  .parent {
    font-size: 10;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1em;
  }

  .borderless-button {
    background-color: transparent;
    border: none;
    outline: none;
    line-height: 0%;
    padding: 0%;
    font-size: 30px;
    transition: transform 0.05s;
    transform-origin: center center;
  }

  .scale-on-hover:hover {
    transform: scale(1.1);
  }

  img {
    width: 45px;
    height: 45px;
  }
</style>
