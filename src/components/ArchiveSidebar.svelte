<script>
  import { stores } from "@sapper/app";
  import { Offcanvas, Col, Container, Row, Icon } from "sveltestrap";
  import ViewCard from "./ViewCard.svelte";

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

<button class="borderless-button" on:click={toggle}>
  <Icon name="archive-fill" />
  Archived Cards
</button>
<div class="archive-sidebar-parent">
  <Offcanvas scroll isOpen={open} placement="end" {toggle}>
    <div slot="header">
      <Row>
        <Col xs="2">
          <button class="borderless-button" on:click={back}>
            <Icon name="arrow-left" />
          </button>
        </Col>
        <Col xs="10">Archived Cards</Col>
      </Row>
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
</style>
