<script>
  import { fly } from "svelte/transition";
  import {
    Col,
    Container,
    Row,
    Card,
    CardBody,
    CardHeader,
    Icon,
  } from "sveltestrap/src";
  import Sidebar from "./Sidebar.svelte";

  export let show_menu;
  let archived_toggle = false;
  function openArchivedCards() {
    archived_toggle = true;
    show_menu = false;
  }
</script>

{#if show_menu}
  <nav class="sidebar" transition:fly={{ x: 300, opacity: 1 }}>
    <Card>
      <CardHeader>
        <Container>
          <Row>
            <Col class="sidebar-sidebar-header" xs="10">Menu</Col>
            <Col xs="2"
              ><button
                class="borderless-button sidebar-close-button"
                on:click={() => {
                  show_menu = !show_menu;
                }}>x</button
              >
            </Col>
          </Row>
        </Container>
      </CardHeader>
      <CardBody>
        <button class="borderless-button" on:click={openArchivedCards}
          ><Icon name="archive-fill" /> Archived Cards</button
        >
      </CardBody>
    </Card>
  </nav>
{/if}

<Sidebar bind:show_sidebar={archived_toggle} />

<style>
  nav {
    position: fixed;
    top: 6.1em;
    right: 0;
    height: 100%;
    padding: 0;
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
    font-size: medium;
    transition: transform 0.05s;
    transform-origin: center center;
    text-align: center;
  }

  .sidebar-close-button {
    font-size: 30px;
    text-align: center;
    color: lightgray;
  }

  .sidebar :global(.sidebar-sidebar-header) {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
</style>
