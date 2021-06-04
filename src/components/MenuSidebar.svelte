<script>
  import { Offcanvas, Row, Col, Tooltip } from "sveltestrap";
  import ArchiveSidebar from "./ArchiveSidebar.svelte";
  import SyncedCalendarsSidebar from "./SyncedCalendarsSidebar.svelte";
  import SettingsSidebar from "./SettingsSidebar.svelte";
  import SignOutSidebar from "./SignOutSidebar.svelte";

  let isSidebarOpen = false;

  const toggle = () => (isSidebarOpen = !isSidebarOpen);
</script>

<div>
  <button
    id="menu-sidebar-button"
    class="scale-on-hover borderless-button"
    on:click={toggle}
  >
    <img src="menu_ellipses_vertical.png" alt="Menu" />
  </button>
  <Tooltip target="menu-sidebar-button" placement="bottom">Menu</Tooltip>
  <Offcanvas header="Menu" isOpen={isSidebarOpen} placement="end" {toggle}>
    <div class="menu-sidebar-offcanvas-flexbox">
      <div class="menu-sidebar-offcanvas-body">
        <ArchiveSidebar bind:isSidebarOpen />
        <br />
        <SyncedCalendarsSidebar bind:isSidebarOpen />
      </div>
      <div>
        <Row>
          <Col>
            <SettingsSidebar bind:isSidebarOpen />
          </Col>
          <Col>
            <SignOutSidebar />
          </Col>
        </Row>
      </div>
    </div>
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

  .menu-sidebar-offcanvas-flexbox {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .menu-sidebar-offcanvas-body {
    flex: 1;
  }

  .scale-on-hover:hover {
    transform: scale(1.1);
  }

  img {
    width: 45px;
    height: 45px;
  }
</style>
