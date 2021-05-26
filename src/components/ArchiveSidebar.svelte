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

  function handleCardUnarchived(event) {
    console.debug(`[Sidebar.svelte] Handling 'cardunarchived'...`);
    if ($session.archived_cards === null || $session.lists.length === 0) {
      throw new Error(`There are no lists to place the unarchived card into`);
    }

    let cardToUnarchive;
    const cardIndex = $session.archived_cards.findIndex((card) => {
      if (card._id === event.detail) {
        cardToUnarchive = card;
        return true;
      }
      return false;
    });

    if (typeof cardToUnarchive === "undefined") {
      throw new Error(
        `Couldn't find card ${event.detail} in the list of archived cards`
      );
    }

    $session.lists[0].cards = [...$session.lists[0].cards, cardToUnarchive];

    const beforeCards = $session.archived_cards.slice(0, cardIndex);
    const afterCards = $session.archived_cards.slice(cardIndex + 1);
    $session.archived_cards = [...beforeCards, ...afterCards];
  }
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
        <Col>
          {#if $session.archived_cards && $session.archived_cards.length > 0}
            {#each $session.archived_cards as card (card._id)}
              <ViewCard
                bind:card
                on:cardunarchived={handleCardUnarchived}
                isArchived
              />
            {/each}
          {:else}
            <p>You don't have any archived cards.</p>
          {/if}
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
