<script>
  import { Offcanvas, Card, CardBody, Button } from "sveltestrap";
  import ArchiveSidebar from "./ArchiveSidebar.svelte";
  import SyncedCalendarsSidebar from "./SyncedCalendarsSidebar.svelte";
  import SettingsSidebar from "./SettingsSidebar.svelte";
  import SignOut from "./SignOut.svelte";
  let isSidebarOpen = false;
  const toggle = () => (isSidebarOpen = !isSidebarOpen);
</script>

<div>
  <button class="scale-on-hover borderless-button" on:click={toggle}>
    <img src="menu_ellipses_vertical.png" alt="Menu" />
  </button>

  <Offcanvas header="Menu" isOpen={isSidebarOpen} placement="end" {toggle}>
    <ArchiveSidebar bind:isSidebarOpen />
    <br />
    <SyncedCalendarsSidebar bind:isSidebarOpen />
    <br />
    <SettingsSidebar bind:isSidebarOpen />
    <br />
    <SignOut />
  </Offcanvas>
</div>

<style>
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
