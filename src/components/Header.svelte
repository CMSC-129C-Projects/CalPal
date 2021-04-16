<script>
  import { Col, Row } from "sveltestrap/src";
  import NavBar from "./NavBar.svelte";
</script>

<div class="parent">
  <Row class="header">
    <Col class="col1" xs="4">
      <p class="overflow">
        <img src="CalPal_logo.png" alt="CalPal Logo" />
        <span class="calpal cal">Cal</span>
        <span class="calpal pal">Pal</span>
      </p>
    </Col>
    <Col class="col2" xs="4" />
    <Col class="col3" xs="4"><NavBar /></Col>
  </Row>
</div>

<style>
  .parent {
    background-color: #78c0e0;
  }

  .parent :global(.header) {
    margin-left: 1.5em;
    margin-right: 1.5em;
    padding: 0;
  }

  img {
    width: 70px;
    height: 70px;
  }

  .overflow {
    white-space: nowrap;
  }

  .calpal {
    font-size: 3em;
    font-family: "Nunito", sans-serif;
    position: relative;
    top: 0.4em;
    left: -0.1em;
    text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white,
      1px 1px 0 white;
  }

  .cal {
    color: #00b0f0;
  }

  .pal {
    color: #f58f29;
  }
</style>
