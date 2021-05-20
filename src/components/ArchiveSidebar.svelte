<script lang="ts">
  import { stores } from "@sapper/app";
  import { fly } from "svelte/transition";
  import {
    Offcanvas,
    Col,
    Container,
    Row,
    Card,
    CardHeader,
    CardBody,
    Icon,
  } from "sveltestrap";
  import ViewCard from "./ViewCard.svelte";

  const { session } = stores();
  let open = false;
  export let isSidebarOpen;
  const toggle = () => {
    open = !open;
    isSidebarOpen = false;
  };

  export let is_archive_sidebar_shown;

  function closeSidebar() {
    is_archive_sidebar_shown = false;
  }

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

<!-- {#if is_archive_sidebar_shown}
  <nav class="sidebar" transition:fly={{ x: 350 }}>
    <Card>
      <CardHeader>
        <Container>
          <Row>
            <Col class="sidebar-sidebar-header" xs="10">Archived Cards</Col>
            <Col xs="1">
              <button class="borderless-button" on:click={closeSidebar}>
                x
              </button>
            </Col>
          </Row>
        </Container>
      </CardHeader>
      <CardBody>
        {#each $session.archived_cards as card (card._id)}
          <ViewCard
            bind:card
            on:cardunarchived={handleCardUnarchived}
            isArchived
          />
        {/each}
      </CardBody>
    </Card>
  </nav>
{/if} -->
<button class="borderless-button" on:click={toggle}>
  <Icon name="archive-fill" />
  Archived Cards
</button>
<Offcanvas scroll isOpen={open} placement="end" {toggle}>
  <Card>
    <CardHeader>
      <Container>
        <Row>
          <Col class="sidebar-sidebar-header" xs="10">Archived Cards</Col>
        </Row>
      </Container>
    </CardHeader>
    <CardBody>
      {#each $session.archived_cards as card (card._id)}
        <ViewCard
          bind:card
          on:cardunarchived={handleCardUnarchived}
          isArchived
        />
      {/each}
    </CardBody>
  </Card>
</Offcanvas>

<style>
  .borderless-button {
    background-color: transparent;
    border: none;
    outline: none;
    line-height: 0%;
    padding: 0%;
    font-size: medium;
    transition: transform 0.05s;
    transform-origin: center center;
    text-align: center;
  }

  .sidebar-sidebar-header {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
</style>
