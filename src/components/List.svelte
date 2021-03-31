<script>
  import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Icon,
    Col,
    Container,
    Row,
  } from "sveltestrap/src";

  export let list_name;
</script>

<div class="parent">
  <Card class="list">
    <CardHeader class="listHeader">
      <Container class="container">
        <Row>
          <Col class="leftHalf" xs="6"
            ><CardTitle class="cardTitle">{list_name}</CardTitle></Col
          >
          <Col class="rightHalf" xs="6">
            <button class="borderlessButton newFolder">
              <Icon class="newFolder" name="folder-plus" />
            </button>
          </Col>
        </Row>
      </Container>
    </CardHeader>
    <CardBody>
      <div class="flexBoxContainer">
        <div class="cardSample">card 1</div>
        <div class="cardSample">card 2</div>
        <div class="cardSample">card 3</div>
      </div>
    </CardBody>
    <CardFooter class="listFooter">
      <button class="borderlessButton addCard">
        <Icon class="plusIcon" name="plus" />
      </button>
    </CardFooter>
  </Card>
</div>

<style>
  .flexBoxContainer {
    background-color: lightskyblue;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .parent {
    /* margin: 10px 10px 10px 10px; */
  }

  .parent :global(.container) {
    /* background-color: lightseagreen; */
  }

  .parent :global(.list) {
    /* background-color: lightgray; */
    width: 250px;
    min-width: 250px;
  }

  .parent :global(.cardTitle) {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 1.25em;
    margin: 0px 0px 0px 0px;
    padding: 0%;
  }

  .parent :global(.leftHalf) {
    text-align: left;
    padding: 0;
    /* background-color: red; */
  }

  .parent :global(.rightHalf) {
    text-align: right;
    padding: 0;
    /* background-color: blue; */
  }

  .parent :global(.listFooter) {
    text-align: center;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    font-size: medium;
  }

  .borderlessButton {
    background-color: transparent;
    /* background-color: lightcoral; */
    vertical-align: middle;
    border: none;
    outline: none;
    line-height: 0%;
    padding: 0;
    font-size: 1.5em;
    transition: transform 0.05s;
  }

  .parent :global(.plusIcon) {
    color: #40415a;
  }

  .parent :global(.newFolder) {
    color: #40415a;
  }

  .parent :global(.plusIcon:active) {
    color: #f58f29;
  }

  .parent :global(.newFolder:active) {
    color: #f58f29;
  }
</style>
