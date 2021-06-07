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
</script>

<Button outline secondary style="width: 100%; color: black;" on:click={toggle}>
  <Icon name="archive-fill" />
  Archived Cards
</Button>

<div>
  <Offcanvas isOpen={open} placement="end" {toggle}>
    <div slot="header" class="archive-sidebar-header-title">
      <BackSidebar bind:isCurrentMenuOpen={open} bind:isSidebarOpen />
      Archived Cards
    </div>
    <Container>
      <Row>
        <Col
          style="display: flex; flex-direction: column; align-items: center;"
        >
          <div
            style="display: flex; flex-direction: column; width: 260px; gap: 0.5em; padding: 0.5em;"
          >
            {#if $session.archived_cards && $session.archived_cards.length > 0}
              {#each $session.archived_cards as card (card._id)}
                <ViewCard bind:card isArchived />
              {/each}
            {:else}
              <p>You don't have any archived cards.</p>
            {/if}
          </div>
        </Col>
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
