<script>
  import { Col, Row } from "sveltestrap";
  import NavBar from "./NavBar.svelte";

  export let is_board_shown;
</script>

<div class="header-parent">
  <Row class="header-header">
    <Col class="d-none d-sm-block">
      <p class="overflow">
        <img src="CalPal_logo.png" alt="CalPal Logo" />
        <span class="calpal cal">Cal</span>
        <span class="calpal pal">Pal</span>
      </p>
    </Col>
    <Col class="d-block d-sm-none">
      <!-- TODO: Tweak the padding to make it match on `sm` and above devices -->
      <p class="overflow" style="padding-top: 0.75rem;">
        <img src="CalPal_logo.png" alt="CalPal Logo" />
      </p>
    </Col>
    <Col class="d-xs-block"><NavBar bind:is_board_shown /></Col>
  </Row>
</div>

<style>
  .header-parent {
    background-color: #78c0e0;
  }

  .header-parent :global(.header-header) {
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
