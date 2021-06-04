<script>
  import { Tooltip } from "sveltestrap";
  import AddCalendar from "./AddCalendar.svelte";
  import MenuSidebar from "./MenuSidebar.svelte";

  export let isBoardShown;

  function handleViewButton() {
    isBoardShown = !isBoardShown;
  }
</script>

<div class="parent">
  <AddCalendar />
  <div>
    <button
      id="switch-view-button"
      class="scale-on-hover borderless-button"
      on:click={handleViewButton}
    >
      <img src="switch_board_view.png" alt="Board view" />
    </button>
    <Tooltip target="switch-view-button" placement="bottom">
      {#if isBoardShown}
        Switch to Calendar
      {:else}
        Switch to Board
      {/if}
    </Tooltip>
  </div>
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
