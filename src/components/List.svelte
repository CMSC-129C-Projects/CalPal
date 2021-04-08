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
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
  } from "sveltestrap/src";
  import ListTitle from "./ListTitle.svelte";
  import CalPalCard from "./Card.svelte";

  let isOpen = false;

  export let list;
  export let id;

  let isTitleSelected = false;

  function onTitleClicked() {
    isTitleSelected = !isTitleSelected;
  }

  function onArchiveClicked() {
    alert("Archive list?");
  }

  function addCard() {
    list.cards = [
      ...list.cards,
      {
        card_name: "Untitled Card",
        original_title: "",
        original_calendar: "",
        original_date: "",
        date_created: "",
        due_date_time: "",
        remind_date_time: "",
        description: "",
        color: "#ffffff",
        is_archived: false,
      },
    ];
  }
</script>

<div class="parent">
  <Card class="list">
    <CardHeader class="listHeader">
      <Container class="container">
        <Row>
          <Col class="leftHalf">
            <CardTitle
              class="cardTitleContainer"
              on:click={() => onTitleClicked()}
            >
              <ListTitle bind:value={list.list_name} {id} />
            </CardTitle>
          </Col>
          <Col class="rightHalf" xs="2">
            <button class="borderlessButton newFolder">
              <Icon class="newFolder" name="folder-plus" />
            </button>
          </Col>
        </Row>
      </Container>
    </CardHeader>
    <CardBody class="listBody">
      {#each list.cards.filter((c) => {
        return typeof c.card_name !== "undefined";
      }) as card, i (i)}
        <CalPalCard bind:card id="card-{i}" />
      {/each}
    </CardBody>
    <CardFooter class="listFooter">
      <Row>
        <Col class="leftHalf">
          <button class="borderlessButton addCard" on:click={() => addCard()}>
            <Icon class="plusIcon" name="plus" />
            Add Card
          </button>
        </Col>
        <Col class="rightHalf" xs="2">
          <Dropdown {isOpen} toggle={() => (isOpen = !isOpen)}>
            <DropdownToggle caret class="dropDownButton">
              <!-- <Icon class="threeDots" name="three-dots" /> -->
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem on:click={onArchiveClicked}>
                Archive List
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </CardFooter>
  </Card>
</div>

<style>
  .flexBoxContainer {
    /* background-color: lightskyblue; */
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

  .parent :global(.cardTitleContainer) {
    margin: 0px 0px 0px 0px;
    padding: 0%;
  }

  .parent :global(.leftHalf) {
    text-align: left;
    padding: 0;
    display: flex;
    /* background-color: red; */
  }

  .parent :global(.rightHalf) {
    text-align: right;
    padding: 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
    /* background-color: blue; */
  }

  .parent :global(.listBody) {
    padding: 0%;
    margin-top: 10px;
  }

  .parent :global(.listFooter) {
    text-align: center;
    vertical-align: middle;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    padding-left: 2em;
    padding-right: 2em;
    font-size: medium;
  }

  .borderlessButton {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    /* background-color: lightcoral; */
    vertical-align: middle;
    border: none;
    outline: none;
    line-height: 0%;
    padding: 0;
    transition: transform 0.05s;
  }

  .parent :global(.addCard) {
    color: #40415a;
    font-size: 15px;
  }

  .parent :global(.dropDownButton) {
    background-color: transparent;
    color: #40415a;
    vertical-align: middle;
    border: none;
    outline: none;
    line-height: 0%;
    padding: 0;
    font-size: 1.5em;
  }

  .parent :global(.plusIcon) {
    color: #40415a;
    font-size: 1.5em;
  }

  .parent :global(.newFolder) {
    color: #40415a;
    margin-top: 0.08em;
    font-size: 1.2em;
  }

  .parent :global(.newFolder:active) {
    color: #f58f29;
  }

  .parent :global(.plusIcon:active) {
    color: #f58f29;
  }

  .parent :global(.addCard:active) {
    color: #f58f29;
  }

  .parent :global(.isOpen) {
    outline: none;
  }
</style>
