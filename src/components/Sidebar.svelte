<script>
  import { fly } from "svelte/transition";
  import { CardBody, Col, Container, Row } from "sveltestrap/src";
  import { stores } from "@sapper/app";

  import ViewCard from "./ViewCard.svelte";

  const { session } = stores();

  export let show = false;

  function handleCardUnarchived(event) {
    console.debug(`[Sidebar.svelte] Handling 'cardunarchived'...`);
    if ($session.lists.length === 0) {
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

{#if show}
  <nav class="sidebar-area" transition:fly={{ x: 350 }}>
    <header>
      <Container>
        <Row>
          <Col xs="10">Archived Cards</Col>
          <Col xs="2"
            ><button
              class="borderless-button"
              on:click={() => {
                show = false;
              }}
            >
              x
            </button>
          </Col>
        </Row>
      </Container>
    </header>

    <CardBody>
      {#each $session.archived_cards as archived_card (archived_card._id)}
        <ViewCard
          bind:card={archived_card}
          on:cardunarchived={handleCardUnarchived}
        />
      {/each}
    </CardBody>
  </nav>
{/if}

<style>
  nav {
    position: fixed;
    top: 6.1em;
    right: 0;
    height: 100%;
    padding: 1rem 1rem 0.6rem;
    border-left: 1px solid #aaa;
    background: rgb(240, 240, 240);
    overflow-y: auto;
    width: 20rem;
    z-index: 1030;
  }

  header {
    border-bottom: 3px solid lightgray;
    padding-bottom: 5px;
    color: darkslategrey;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 25px;
    text-align: center;
  }
  .borderless-button {
    background-color: transparent;
    border: none;
    outline: none;
    line-height: 0%;
    padding: 0%;
    font-size: 30px;
    transition: transform 0.05s;
    transform-origin: center center;
    color: lightgray;
  }
</style>
