<script>
  import MenuSidebar from "./MenuSidebar.svelte";
  import ArchiveSidebar from "./ArchiveSidebar.svelte";
  import AddCalender from "./AddCalendar.svelte";
  import AddCalendar from "./AddCalendar.svelte";

  let is_menu_sidebar_shown;
  let is_archive_sidebar_shown;

  function handleMenuButton() {
    if (!is_menu_sidebar_shown && !is_archive_sidebar_shown) {
      is_menu_sidebar_shown = !is_menu_sidebar_shown;
    } else if (is_menu_sidebar_shown && !is_archive_sidebar_shown) {
      is_menu_sidebar_shown = !is_menu_sidebar_shown;
    } else if (!is_menu_sidebar_shown && is_archive_sidebar_shown) {
      is_archive_sidebar_shown = !is_archive_sidebar_shown;
    }
  }
</script>

<div class="parent">
  <AddCalendar />
  <button class="scale-on-hover borderless-button">
    <img src="add_calendar.png" alt="Add Calendar" />
  </button>
  <button class="scale-on-hover borderless-button">
    <img src="switch_board_view.png" alt="Board view" />
  </button>
  <button class="scale-on-hover borderless-button" on:click={handleMenuButton}>
    <img src="menu_ellipses_vertical.png" alt="Menu" />
  </button>
  <MenuSidebar bind:is_menu_sidebar_shown bind:is_archive_sidebar_shown />
  <ArchiveSidebar bind:is_archive_sidebar_shown />
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
