<script>
  import { fly } from "svelte/transition";
  import {
    Col,
    Container,
    Row,
    Card,
    CardHeader,
    CardBody,
    Icon,
  } from "sveltestrap/src";
  import { stores } from "@sapper/app";

  import ViewCard from "./ViewCard.svelte";

  const { session } = stores();

  export let show_sidebar;
  export let id;
  export function closeSidebar() {
    show_sidebar = false;
  }
</script>

{#if show_sidebar}
  <nav class="sidebar" transition:fly={{ x: 350 }}>
    <Card>
      <CardHeader>
        <Container>
          <Row>
            <Col class="sidebar-sidebar-header" xs="10">Archived Cards</Col>
            <Col xs="1"
              ><button class="borderless-button" on:click={closeSidebar}
                >x</button
              >
            </Col>
          </Row>
        </Container>
      </CardHeader>
      <CardBody>
        {#each $session.lists as list, i (i)}
          {#each list.cards.filter((c) => {
            return !(typeof c.card_name === "undefined" || !c.is_archived);
          }) as card, j (card)}
            <ViewCard bind:card id="{id}-card-{j}" />
          {/each}
        {/each}
      </CardBody>
    </Card>
  </nav>
{/if}

<style>
  nav {
    position: fixed;
    top: 6.1em;
    right: 0;
    height: 100%;
    /* padding: 1rem 1rem 0.6rem; */
    border-left: 1px solid #aaa;
    background: #fff;
    overflow-y: auto;
    width: 18em;
    z-index: 1030;
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

  .sidebar :global(.sidebar-sidebar-header) {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
</style>
