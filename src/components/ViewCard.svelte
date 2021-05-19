<script>
  import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    FormGroup,
    Input,
    Label,
    Col,
    Container,
    Row,
  } from "sveltestrap/src";
  import Card from "./Card.svelte";
  import Title from "./Title.svelte";
  import ColorPicker from "./ColorPicker.svelte";
  import ArchiveCard from "./ArchiveCard.svelte";
  import Attachment from "./Attachment.svelte";
  import {
    formattedDate,
    getDateAndTimeStringsFromDate,
  } from "../routes/_date-format.js";

  export let card;
  // TODO: When toggling isArchived, all footer elements appear at
  //       the same time for a moment as the Card does its fade
  //       animation. Find a way to make it so the new footer
  //       elements don't show up while the animation is occurring.
  export let isArchived = false;

  let open = false;
  const toggle = () => (open = !open);

  let cardColor;
  $: {
    cardColor = card.color;
    if (isArchived) {
      cardColor = "#AAAAAA";
    }
  }

  let dueDateTime = getDateAndTimeStringsFromDate(new Date(card.due_date_time));
  let remindDateTime = getDateAndTimeStringsFromDate(
    new Date(card.remind_date_time)
  );

  $: {
    if (dueDateTime.date === "") {
      dueDateTime.time = "";
      remindDateTime.date = "";
      remindDateTime.time = "";
      card.due_date_time = "";
      card.remind_date_time = "";
    } else if (remindDateTime.date === "") {
      remindDateTime.time = "";
      card.remind_date_time = "";
    } else {
      const newDueDateTime = new Date(
        `${dueDateTime.date} ${dueDateTime.time}`.trim()
      );
      card.due_date_time = newDueDateTime;
      card.remind_date_time = new Date(
        `${remindDateTime.date} ${remindDateTime.time}`.trim()
      );
    }
  }
</script>

<div class="view-card-parent">
  <Card {card} {cardColor} on:click={toggle} />
  <Modal isOpen={open} {toggle}>
    <ModalHeader style="background-color: {cardColor};" {toggle}>
      <Title
        bind:value={card.card_name}
        id="card-{card._id}"
        disabled={isArchived}
        untitledString={card.original_title
          ? card.original_title
          : "Untitled Card"}
      />
    </ModalHeader>
    <ModalBody>
      <Container>
        <div>{card.original_title}</div>
        <div>
          {#if !card.original_date}
            {formattedDate(new Date(card.due_date_time))}
          {:else}
            {formattedDate(new Date(card.original_date))}
          {/if}
        </div>
        <FormGroup>
          <Label for="cardNotes">NOTES</Label>
          <Input
            type="textarea"
            name="text"
            id="cardNotes"
            bind:value={card.description}
            disabled={isArchived}
          />
        </FormGroup>
        <FormGroup>
          <Attachment cardId={card._id} />
        </FormGroup>
      </Container>
      <Container>
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="dueDate">Due Date</Label>
              <Input
                type="date"
                name="dueDate"
                id="dueDate"
                bind:value={dueDateTime.date}
                disabled={isArchived}
              />
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label for="dueTime">Time</Label>
              <Input
                type="time"
                name="dueTime"
                id="dueTime"
                bind:value={dueDateTime.time}
                disabled={dueDateTime.date === "" || isArchived}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="reminderDate">Reminder</Label>
              <Input
                type="date"
                name="reminderDate"
                id="reminderDate"
                bind:value={remindDateTime.date}
                disabled={dueDateTime.date === "" || isArchived}
              />
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label for="reminderTime">Time</Label>
              <Input
                type="time"
                name="reminderTime"
                id="reminderTime"
                bind:value={remindDateTime.time}
                disabled={remindDateTime.date === "" || isArchived}
              />
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </ModalBody>
    <ModalFooter>
      <Container>
        <Row>
          {#if !isArchived}
            <Col>
              <ColorPicker bind:color={card.color} />
            </Col>
          {/if}
          <!-- TODO: Find out why we can't use `:global()` with Sveltestrap 5 -->
          <Col style="display: flex; flex-direction: row-reverse;">
            <ArchiveCard
              bind:card
              {isArchived}
              on:cardarchived
              on:cardunarchived
            />
          </Col>
        </Row>
      </Container>
    </ModalFooter>
  </Modal>
</div>
