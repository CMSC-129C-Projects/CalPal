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
  import Title from "./Title.svelte";
  import ViewCard from "./ViewCard.svelte";

  let isOpen = false;

  export let list;
  export let id;

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

<div class="list-parent">
  <Card class="list-list">
    <CardHeader>
      <Container>
        <Row>
          <Col class="list-left-half">
            <CardTitle class="card-card-title-container">
              <Title
                bind:value={list.list_name}
                {id}
                untitledString="Untitled List"
              />
            </CardTitle>
          </Col>
          <Col class="list-right-half" xs="2">
            <button class="borderless-button list-new-folder">
              <Icon class="list-new-folder" name="folder-plus" />
            </button>
          </Col>
        </Row>
      </Container>
    </CardHeader>
    <CardBody class="list-list-body">
      {#each list.cards.filter((c) => {
        return !(typeof c.card_name === "undefined" || c.is_archived);
      }) as card, i (card)}
        <ViewCard bind:card id="{id}-card-{i}" />
      {/each}
    </CardBody>
    <CardFooter class="list-list-footer">
      <Row>
        <Col class="list-left-half">
          <button
            class="borderless-button list-add-card"
            on:click={() => addCard()}
          >
            <Icon class="list-plus-icon" name="plus" />
            Add Card
          </button>
        </Col>
        <Col class="list-right-half" xs="2">
          <Dropdown
            class={isOpen ? "list-is-open" : ""}
            toggle={() => (isOpen = !isOpen)}
          >
            <DropdownToggle caret class="list-drop-down-button">
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
  .list-parent :global(.list-list) {
    width: 250px;
    min-width: 250px;
  }

  .list-parent :global(.card-card-title-container) {
    margin: 0px 0px 0px 0px;
    padding: 0%;
  }

  .list-parent :global(.list-left-half) {
    text-align: left;
    padding: 0;
    display: flex;
  }

  .list-parent :global(.list-right-half) {
    text-align: right;
    padding: 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
  }

  .list-parent :global(.list-list-body) {
    padding: 0%;
    margin-top: 10px;
  }

  .list-parent :global(.list-list-footer) {
    text-align: center;
    vertical-align: middle;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    padding-left: 2em;
    padding-right: 2em;
    font-size: medium;
  }

  .borderless-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    vertical-align: middle;
    border: none;
    outline: none;
    line-height: 0%;
    padding: 0;
    transition: transform 0.05s;
  }

  .list-parent :global(.list-add-card) {
    color: #40415a;
    font-size: 15px;
  }

  .list-parent :global(.list-drop-down-button) {
    background-color: transparent;
    color: #40415a;
    vertical-align: middle;
    border: none;
    outline: none;
    line-height: 0%;
    padding: 0;
    font-size: 1.5em;
  }

  .list-parent :global(.list-plus-icon) {
    color: #40415a;
    font-size: 1.5em;
  }

  .list-parent :global(.list-new-folder) {
    color: #40415a;
    margin-top: 0.08em;
    font-size: 1.2em;
  }

  .list-parent :global(.list-new-folder:active) {
    color: #f58f29;
  }

  .list-parent :global(.list-plus-icon:active) {
    color: #f58f29;
  }

  .list-parent :global(.list-add-card:active) {
    color: #f58f29;
  }

  .list-parent :global(.list-is-open) {
    outline: none;
  }
</style>
