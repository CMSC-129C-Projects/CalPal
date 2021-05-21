<script>
  import { stores } from "@sapper/app";
  import { Offcanvas, Col, Container, Row, Icon, Button } from "sveltestrap";
  import ViewCard from "./ViewCard.svelte";
  import BackSidebar from "./BackSidebar.svelte";

  const { session } = stores();

  export let isSidebarOpen;

  let open = false;
  const toggle = () => {
    open = !open;
    isSidebarOpen = false;
  };
  const back = () => {
    open = false;
    isSidebarOpen = true;
  };
</script>

<Button outline secondary style="width: 100%;" on:click={toggle}>
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
        <Col>Insert Settings Here</Col>
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
