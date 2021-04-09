<script>
  import {
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    Col,
    Container,
    Row,
    Button,
  } from "sveltestrap/src";

  let isOpen = false;
</script>

<div class="parent">
  <Dropdown {isOpen} toggle={() => (isOpen = !isOpen)}>
    <DropdownToggle class="colorPickerButton" caret>Color</DropdownToggle>
    <DropdownMenu>
      <Container>
        <Row>
          <Col><Button class="colors aprilSunrise1" /></Col>
          <Col><Button class="colors aprilSunrise2" /></Col>
          <Col><Button class="colors aprilSunrise3" /></Col>
          <Col><Button class="colors aprilSunrise4" /></Col>
          <Col><Button class="colors aprilSunrise5" /></Col>
        </Row>
        <Row>
          <Col><Button class="colors schro1" /></Col>
          <Col><Button class="colors schro2" /></Col>
          <Col><Button class="colors schro3" /></Col>
          <Col><Button class="colors schro4" /></Col>
          <Col><Button class="colors schro5" /></Col>
        </Row>
        <Row>
          <Col><Button class="colors lucca1" /></Col>
          <Col><Button class="colors lucca2" /></Col>
          <Col><Button class="colors lucca3" /></Col>
          <Col><Button class="colors lucca4" /></Col>
          <Col><Button class="colors lucca5" /></Col>
        </Row>
        <Row>
          <Col><Button class="colors winnieThePooh1" /></Col>
          <Col><Button class="colors winnieThePooh2" /></Col>
          <Col><Button class="colors winnieThePooh3" /></Col>
          <Col><Button class="colors winnieThePooh4" /></Col>
          <Col><Button class="colors winnieThePooh5" /></Col>
        </Row>
        <Row>
          <Col><Button class="colors herbsAndSpices1" /></Col>
          <Col><Button class="colors herbsAndSpices2" /></Col>
          <Col><Button class="colors herbsAndSpices3" /></Col>
          <Col><Button class="colors herbsAndSpices4" /></Col>
          <Col><Button class="colors herbsAndSpices5" /></Col>
        </Row>
      </Container>
    </DropdownMenu>
  </Dropdown>
</div>

<style>
  .parent :global(.colorPickerButton) {
    background-color: transparent;
    color: black;
    box-shadow: none;
  }

  .parent :global(.colors) {
    box-shadow: none;
  }

  .parent :global(.aprilSunrise1) {
    background-color: #fff861;
    border-color: #fff861;
  }

  .parent :global(.aprilSunrise2) {
    background-color: #ffd05e;
    border-color: #ffd05e;
  }

  .parent :global(.aprilSunrise3) {
    background-color: #c1f9f4;
    border-color: #c1f9f4;
    outline: none;
  }

  .parent :global(.aprilSunrise4) {
    background-color: #cfe5ec;
    border-color: #cfe5ec;
  }

  .parent :global(.aprilSunrise5) {
    background-color: #9ab0d4;
    border-color: #9ab0d4;
  }

  .parent :global(.schro1) {
    background-color: #ffa29a;
    border-color: #ffa29a;
  }

  .parent :global(.schro2) {
    background-color: #ffcdcd;
    border-color: #ffcdcd;
  }

  .parent :global(.schro3) {
    background-color: #ffcc61;
    border-color: #ffcc61;
  }

  .parent :global(.schro4) {
    background-color: #96f4d3;
    border-color: #96f4d3;
  }

  .parent :global(.schro5) {
    background-color: #04d1ca;
    border-color: #04d1ca;
  }

  .parent :global(.lucca1) {
    background-color: #aed0e5;
    border-color: #aed0e5;
  }

  .parent :global(.lucca2) {
    background-color: #cec198;
    border-color: #cec198;
  }

  .parent :global(.lucca3) {
    background-color: #fbeab7;
    border-color: #fbeab7;
  }

  .parent :global(.lucca4) {
    background-color: #27305c;
    border-color: #27305c;
  }

  .parent :global(.lucca5) {
    background-color: #f6e9c8;
    border-color: #f6e9c8;
  }

  .parent :global(.winnieThePooh1) {
    background-color: #ffdaa1;
    border-color: #ffdaa1;
  }

  .parent :global(.winnieThePooh2) {
    background-color: #fff19c;
    border-color: #fff19c;
  }

  .parent :global(.winnieThePooh3) {
    background-color: #ff6d6d;
    border-color: #ff6d6d;
  }

  .parent :global(.winnieThePooh4) {
    background-color: #d8fffe;
    border-color: #d8fffe;
  }

  .parent :global(.winnieThePooh5) {
    background-color: #ffffe0;
    border-color: #ffffe0;
  }

  .parent :global(.herbsAndSpices1) {
    background-color: #e1cf6b;
    border-color: #e1cf6b;
  }

  .parent :global(.herbsAndSpices2) {
    background-color: #c294b8;
    border-color: #c294b8;
  }

  .parent :global(.herbsAndSpices3) {
    background-color: #ffa363;
    border-color: #ffa363;
  }

  .parent :global(.herbsAndSpices4) {
    background-color: #8a915d;
    border-color: #8a915d;
  }

  .parent :global(.herbsAndSpices5) {
    background-color: #f2d88e;
    border-color: #f2d88e;
  }
</style>
