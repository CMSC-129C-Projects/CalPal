<script>
  import MenuSidebar from "./MenuSidebar.svelte";
  let menu_show = false;
  export let sidebar_show;

  function toggleSidebar() {
    if (sidebar_show) sidebar_show = !sidebar_show;
    else menu_show = !menu_show;
  }
</script>

<div class="parent">
  <button class="scale-on-hover borderless-button">
    <img src="add_calendar.png" alt="Add Calendar" />
  </button>
  <button class="scale-on-hover borderless-button">
    <img src="switch_board_view.png" alt="Board view" />
  </button>
  <!-- <button
    class="scale-on-hover borderless-button"
    on:click={() => (menu_show = !menu_show)}
  >
    <img src="menu_ellipses_vertical.png" alt="Menu" />
  </button> -->
  <button class="scale-on-hover borderless-button" on:click={toggleSidebar}>
    <img src="menu_ellipses_vertical.png" alt="Menu" />
  </button>
  <MenuSidebar bind:show={menu_show} />
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
