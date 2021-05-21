<script>
  import { Offcanvas, Col, Container, Row, Icon, Button } from "sveltestrap";
  import BackSidebar from "./BackSidebar.svelte";

  export let isSidebarOpen;

  let open = false;
  const toggle = () => {
    open = !open;
    isSidebarOpen = false;
  };
</script>

<Button outline secondary style="width: 100%; color:black;" on:click={toggle}>
  <Icon name="calendar-check-fill" />
  Synced Calendars
</Button>

<div>
  <Offcanvas scroll isOpen={open} placement="end" {toggle}>
    <div slot="header" class="archive-sidebar-header-title">
      <BackSidebar bind:isCurrentMenuOpen={open} bind:isSidebarOpen />
      Synced Calendars
    </div>
    <Container>
      <Row>
        <Col>Insert synced calendars here</Col>
      </Row>
    </Container>
  </Offcanvas>
</div>

<style>
  .archive-sidebar-header-title {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>
