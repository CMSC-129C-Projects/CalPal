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
  <Icon name="box-arrow-left" />
  Sign Out
</Button>

<div>
  <Offcanvas scroll isOpen={open} placement="end" {toggle}>
    <div slot="header" class="archive-sidebar-header-title">
      <BackSidebar bind:isCurrentMenuOpen={open} bind:isSidebarOpen />
      Sign Out
    </div>
    <Container>
      <Row>
        <Col>Sign Out Shit Happens</Col>
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
