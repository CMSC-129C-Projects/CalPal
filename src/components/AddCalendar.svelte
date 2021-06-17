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
  import getObjectId from "../routes/util/_object-id";

  const { session } = stores();

  const urlErrorMessage = "Could not read the URL. Did you enter it correctly?";
  const googleCalendarIdErrorMessage =
    "Could not read the Google Calendar ID. Did you enter it correctly?";

  class ICalURLParseError extends Error {
    constructor(message) {
      super(message);
      this.name = "ICalURLParseError";
    }
  }

  let open = false;
  let calendarName = "";
  let inputSrc = "";
  let errorMessage = "";
  let calendarSourceType = "url";

  $: calendarSourcePlaceholder =
    calendarSourceType === "url"
      ? "https://examplecalendar.com/calendar.ics"
      : "abcdef12345@group.calendar.google.com";

  $: isGoogleCalendarId = !/^http/i.test(inputSrc);

  const toggle = () => {
    open = !open;
  };

  const clearFields = () => {
    calendarName = "";
    inputSrc = "";
  };

  $: {
    if (!open) {
      clearFields();
      errorMessage = "";
    }
  }

  const getCardsFromUrl = async (src) => {
    try {
      const encodedSrc = encodeURIComponent(src);
      const response = await fetch(`/api/ical/parse.json?src=${encodedSrc}`, {
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
    } catch (err) {
      console.error(err);
      throw new ICalURLParseError("Could not parse calendar URL");
    }
  };

  const addCalendar = () => {
    $session.calendars = [
      ...$session.calendars,
      {
        _id: getObjectId(),
        name: calendarName,
        src: inputSrc,
      },
    ];
  };

  const isCalendarAdded = () => {
    for (const calendar of $session.calendars) {
      if (calendar.src === inputSrc) return true;
    }
    return false;
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
                placeholder="My Calendar"
                bind:value={calendarName}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="add-calendar-link">Calendar Source</Label>
              <Input
                type="url"
                name="url"
                id="add-calendar-url"
                placeholder={calendarSourcePlaceholder}
                bind:value={inputSrc}
              />
            </FormGroup>
            {#if errorMessage}
              <p class="error-message">{errorMessage}</p>
            {/if}
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Input
                id="r1"
                type="radio"
                bind:group={calendarSourceType}
                value="url"
                label="iCal URL"
              />
              <Input
                id="r2"
                type="radio"
                bind:group={calendarSourceType}
                value="google-calendar-id"
                label="Google Calendar ID"
              />
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </ModalBody>
    <ModalFooter class="add-calendar-footer">
      <Button color="secondary" on:click={toggle}>Cancel</Button>
      <Button
        color="primary"
        on:click={async () => {
          if (!calendarName || !inputSrc) {
            errorMessage = "Both fields are required.";
            return;
          }
          if (isCalendarAdded()) {
            errorMessage = "Calendar has already been added.";
            return;
          }

          if (calendarSourceType === "url" && isGoogleCalendarId) {
            errorMessage = urlErrorMessage;
            return;
          } else if (
            calendarSourceType === "google-calendar-id" &&
            !isGoogleCalendarId
          ) {
            errorMessage = googleCalendarIdErrorMessage;
            return;
          }

          try {
            await getCardsFromUrl(inputSrc);
            await addCalendar();
            toggle();
            clearFields();
          } catch (err) {
            console.debug(err);
            if (calendarSourceType === "url") {
              errorMessage = urlErrorMessage;
            } else {
              errorMessage = googleCalendarIdErrorMessage;
            }
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
