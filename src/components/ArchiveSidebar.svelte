<script>
  import { stores } from "@sapper/app";
  import {
    Offcanvas,
    Col,
    Container,
    Row,
    Icon,
    Card,
    Button,
  } from "sveltestrap";
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

<div class="component-button-parent">
  <Button class="component-button" on:click={toggle}>
    <Card class="component-button-card">
      <button class="borderless-button">
        <Icon name="archive-fill" />
        Archived Cards
      </button>
    </Card>
  </Button>
</div>
<div>
  <Offcanvas scroll isOpen={open} placement="end" {toggle}>
    <div slot="header" class="archive-sidebar-header-title">
      <BackSidebar bind:isCurrentMenuOpen={open} bind:isSidebarOpen />
      Archived Cards
    </div>
    <Container>
      <Row>
        <Col>
          {#each $session.archived_cards as card (card._id)}
            <ViewCard
              bind:card
              on:cardunarchived={handleCardUnarchived}
              isArchived
            />
          {/each}
        </Col>
      </Row>
    </Container>
  </Offcanvas>
</div>

<style>
  .component-button-parent :global(.component-button-card) {
    background-color: transparent;
    padding: 5%;
  }

  .component-button-parent :global(.component-button) {
    background-color: transparent;
    padding: 0%;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border: none;
    color: black;
    text-align: left;
    width: 345px;
  }

  .borderless-button {
    background-color: transparent;
    border: none;
    outline: none;
    line-height: 0%;
    padding: 0%;
    font-size: 1rem;
    transition: transform 0.05s;
    transform-origin: center center;
    text-align: center;
  }

  .archive-sidebar-header-title {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>
