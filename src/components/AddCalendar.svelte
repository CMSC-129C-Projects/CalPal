<script>
  import { stores } from "@sapper/app";
  import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Col,
    Container,
    Row,
    FormGroup,
    Input,
    Label,
  } from "sveltestrap/src";

  const { session } = stores();

  let open = false;
  let inputUrl = "";

  const toggle = () => (open = !open);

  const getCardsFromUrl = async (url) => {
    const encodedUrl = encodeURIComponent(url);
    console.debug(`[index.svelte] encodedUrl: ${encodedUrl}`);

    const response = await fetch(`/api/ical/parse.json?url=${encodedUrl}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    const insertCardsIntoList = (cards) => {
      const isCardAlreadyInLists = (card) => {
        for (const list of $session.lists) {
          if (list.cards.find((c) => c._id === card._id)) {
            return true;
          }
        }

        if ($session.archived_cards.find((c) => c._id === card._id)) {
          return true;
        }

        return false;
      };

      cards = cards.filter((c) => !isCardAlreadyInLists(c));
      if ($session.lists && $session.lists.length > 0) {
        $session.lists[0].cards = [...$session.lists[0].cards, ...cards];
      }
    };

    insertCardsIntoList(result);
  };
</script>

<div class="add-calendar-parent">
  <button on:click={toggle} class="scale-on-hover borderless-button">
    <img src="add_calendar.png" alt="Add Calendar" />
  </button>
  <Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>
      <span class="add-calendar-header-calpal add-calendar-header-cal">
        Cal
      </span>
      <span class="add-calendar-header-calpal add-calendar-header-pal">
        Pal
      </span>
      <span class="add-calendar-header"> - Add a New Calendar</span>
    </ModalHeader>
    <ModalBody>
      <Container>
        <Row class="add-calendar-message">
          <Col>Input a shared calendar URL.</Col>
        </Row>
        <br />
        <Row>
          <Col>
            <FormGroup>
              <Label for="add-calendar-name">Calendar Name:</Label>
              <Input
                type="plaintext"
                name="calendar-name"
                id="add-calendar-name"
                placeholder="e.g. My Google Calendar"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="add-calendar-link">URL:</Label>
              <Input
                type="url"
                name="url"
                id="add-calendar-url"
                placeholder="Calendar URL"
                bind:value={inputUrl}
              />
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </ModalBody>
    <ModalFooter class="add-calendar-footer">
      <Button
        color="primary"
        on:click={() => {
          toggle();
          getCardsFromUrl(inputUrl);
          inputUrl = "";
        }}
      >
        ADD CALENDAR
      </Button>
    </ModalFooter>
  </Modal>
</div>

<style>
  .add-calendar-parent :global(.add-calendar-header-calpal) {
    font-family: "Nunito", sans-serif;
    text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white,
      1px 1px 0 white;
  }

  .add-calendar-parent :global(.add-calendar-header-cal) {
    color: #00b0f0;
  }

  .add-calendar-parent :global(.add-calendar-header-pal) {
    color: #f58f29;
  }

  .add-calendar-parent :global(.add-calendar-header) {
    font-family: "Nunito", sans-serif;
  }

  .add-calendar-parent :global(.add-calendar-message) {
    font-weight: 500;
  }

  .add-calendar-parent :global(.add-calendar-footer) {
    justify-content: center;
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
  }

  .scale-on-hover:hover {
    transform: scale(1.1);
  }

  img {
    width: 45px;
    height: 45px;
  }
</style>
