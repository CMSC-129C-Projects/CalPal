<script>
  import { fly } from "svelte/transition";
  import { Col, Container, Row, Button } from "sveltestrap/src";
  import Sidebar from "./Sidebar.svelte";

  export let show = false;
  let sidebar_show = false;
</script>

{#if show}
  <nav transition:fly={{ x: 250, opacity: 1 }}>
    <header>
      <Container>
        <Row>
          <Col xs="10">Menu</Col>
          <Col xs="2"
            ><button
              class="borderless-button"
              on:click={() => {
                show = false;
              }}>x</button
            >
          </Col>
        </Row>
      </Container>
    </header>

    <button
      on:click={() => {
        sidebar_show = true;
        show = false;
      }}>Archived Cards</button
    >
  </nav>
{/if}

<Sidebar bind:show={sidebar_show} />

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
    font-family: Arial, Helvetica, sans-serif;
    font-size: 25px;
    /* padding: 1em; */
    /* background-color: burlywood; */
    align-items: center;
    border-bottom: 3px solid darkgray;
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
