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
  import ArchiveSidebar from "./ArchiveSidebar.svelte";

  export let is_menu_sidebar_shown;
  export let is_archive_sidebar_shown;
  function openArchivedCards() {
    is_archive_sidebar_shown = true;
    is_menu_sidebar_shown = false;
  }
</script>

{#if is_menu_sidebar_shown}
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
                  is_menu_sidebar_shown = !is_menu_sidebar_shown;
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

<ArchiveSidebar bind:is_archive_sidebar_shown />

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
