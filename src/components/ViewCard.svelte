<script>
  import { stores } from "@sapper/app";
  import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    FormGroup,
    Input,
    Label,
    Icon,
    CustomInput,
    Col,
    Container,
    Row,
  } from "sveltestrap/src";
  import Card from "./Card.svelte";
  import Title from "./Title.svelte";
  import ColorPicker from "./ColorPicker.svelte";
  import ArchiveCard from "./ArchiveCard.svelte";
  import formattedDate from "../routes/_date-format.js";

  const { session } = stores();

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

  const initializeDateTimeFromString = (dateString) => {
    const date = new Date(dateString);

    if (date.toString() === "Invalid Date") {
      return { date: "", time: "" };
    } else {
      const dateTimeStrings = {
        year: date.getFullYear(),
        month: (date.getMonth() + 1).toString().padStart(2, "0"),
        date: date.getDate().toString().padStart(2, "0"),
        hours: date.getHours().toString().padStart(2, "0"),
        minutes: date.getMinutes().toString().padStart(2, "0"),
      };
      const dateString = `${dateTimeStrings.year}-${dateTimeStrings.month}-${dateTimeStrings.date}`;
      const timeString = `${dateTimeStrings.hours}:${dateTimeStrings.minutes}`;

      if (date.toISOString().split("T").length === 1) {
        return {
          date: dateString,
          time: "",
        };
      } else {
        return {
          date: dateString,
          time: timeString,
        };
      }
    }
  };

  let dueDateTime = initializeDateTimeFromString(card.due_date_time);
  let remindDateTime = initializeDateTimeFromString(card.remind_date_time);

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
        `${dueDateTime.date} ${dueDateTime.time}`
      );
      card.due_date_time = newDueDateTime;
      card.remind_date_time = new Date(
        `${remindDateTime.date} ${remindDateTime.time}`
      );
    }
  }
</script>

<div class="view-card-parent" style="--card-color: {cardColor}">
  <Card {card} {cardColor} on:click={toggle} />
  <Modal isOpen={open} {toggle}>
    <ModalHeader class="card-card-label" {toggle}>
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
          <Label for="attachements">
            <Icon name="paperclip" />
            Attachments
          </Label>
          <CustomInput
            type="file"
            id="attachments"
            name="customFile"
            disabled={isArchived}
          />
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
        <Row class="view-card-container">
          <Col class="view-card-left-half" xs="4.5">
            {#if !isArchived}
              <ColorPicker bind:color={card.color} />
            {/if}
          </Col>
          <Col class="view-card-right-half" xs="7.5">
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

<style>
  .view-card-parent :global(.card-card-label) {
    background-color: var(--card-color, transparent);
  }

  .view-card-parent :global(.view-card-container) {
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .view-card-parent :global(.view-card-left-half) {
    background-color: transparent;
    display: flex;
    border: none;
    outline: none;
    padding: 0%;
    flex-grow: 1;
  }

  .view-card-parent :global(.view-card-right-half) {
    background-color: transparent;
    border: none;
    outline: none;
    align-items: center;
    display: flex;
    padding: 0%;
  }
</style>
