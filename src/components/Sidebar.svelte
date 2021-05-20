<script lang="ts">
  import { Offcanvas, Card, CardBody, Icon } from "sveltestrap";
  import ArchiveSidebar from "./ArchiveSidebar.svelte";
  let isSidebarOpen = false;
  const toggle = () => (isSidebarOpen = !isSidebarOpen);
</script>

<div>
  <button class="scale-on-hover borderless-button" on:click={toggle}>
    <img src="menu_ellipses_vertical.png" alt="Menu" />
  </button>

  <Offcanvas scroll isOpen={isSidebarOpen} placement="end" {toggle}>
    <!-- <h1 slot="header">
      <i>Hello <b>World!</b></i>
    </h1>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua. -->
    <Card>
      <CardBody>
        <!-- // <button class="borderless-button">
          // <Icon name="archive-fill" />
          // Archived Cards // //</button
        //> -->
        <ArchiveSidebar bind:isSidebarOpen />
      </CardBody>
    </Card>
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
