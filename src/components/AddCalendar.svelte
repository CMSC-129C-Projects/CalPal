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
    Tooltip,
  } from "sveltestrap/src";

  const { session } = stores();

  class ICalURLParseError extends Error {
    constructor(message) {
      super(message);
      this.name = "ICalURLParseError";
    }
  }

  let open = false;
  let calendarName = "";
  let inputUrl = "";
  let errorMessage = "";

  const toggle = () => {
    open = !open;
  };

  const clearFields = () => {
    calendarName = "";
    inputUrl = "";
  };

  $: {
    if (!open) {
      clearFields();
      errorMessage = "";
    }
  }

  const getCardsFromUrl = async (url) => {
    const encodedUrl = encodeURIComponent(url);
    console.debug(`[index.svelte] encodedUrl: ${encodedUrl}`);

    const response = await fetch(`/api/ical/parse.json?url=${encodedUrl}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new ICalURLParseError("Could not parse calendar URL");
    }
    const result = await response.json();

    const insertCardsIntoFirstList = (cards) => {
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

    insertCardsIntoFirstList(result);
  };

  const addCalendar = async () => {
    const res = await fetch(`/api/card/oid`);
    const objectId = await res.text();

    $session.calendars = [
      ...$session.calendars,
      {
        _id: objectId,
        name: calendarName,
        url: inputUrl,
      },
    ];
  };
</script>

<div class="add-calendar-parent">
  <button
    on:click={toggle}
    id="add-calendar-button"
    class="scale-on-hover borderless-button"
  >
    <img src="add_calendar.png" alt="Add Calendar" />
  </button>
  <Tooltip target="add-calendar-button" placement="bottom">
    Add Calendar
  </Tooltip>
  <Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>
      <span class="add-calendar-header">Add a new calendar</span>
    </ModalHeader>
    <ModalBody>
      <Container>
        <Row>
          <Col>
            <FormGroup>
              <Label for="add-calendar-name">Calendar Name</Label>
              <Input
                type="plaintext"
                name="calendar-name"
                id="add-calendar-name"
                placeholder="e.g. My Google Calendar"
                bind:value={calendarName}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="add-calendar-link">URL</Label>
              <Input
                type="url"
                name="url"
                id="add-calendar-url"
                placeholder="Calendar URL"
                bind:value={inputUrl}
              />
            </FormGroup>
            {#if errorMessage}
              <p class="error-message">{errorMessage}</p>
            {/if}
          </Col>
        </Row>
      </Container>
    </ModalBody>
    <ModalFooter class="add-calendar-footer">
      <Button color="secondary" on:click={toggle}>Cancel</Button>
      <Button
        color="primary"
        on:click={async () => {
          try {
            await getCardsFromUrl(inputUrl);
            await addCalendar();
            toggle();
            clearFields();
          } catch (err) {
            console.debug(err);
            errorMessage =
              "Could not read the URL. Did you enter it correctly?";
          }
        }}
      >
        Add Calendar
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

  .error-message {
    color: var(--bs-red);
  }
</style>
