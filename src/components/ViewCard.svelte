<script>
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
  import Reminder from "./Reminder.svelte";
  import ArchiveCard from "./ArchiveCard.svelte";
  import formattedDate from "../routes/_date-format.js";

  export let card;

  let open = false;
  const toggle = () => (open = !open);

  $: cardColor = card.color;
  $: {
    if (card.is_archived) {
      cardColor = "#AAAAAA";
    }
  }
</script>

<div class="view-card-parent" style="--card-color: {cardColor}">
  <Card {card} on:click={toggle} />
  <Modal isOpen={open} {toggle}>
    <ModalHeader class="card-card-label" {toggle}>
      <Title
        bind:value={card.card_name}
        id="card-{card._id}"
        disabled={card.is_archived}
        untitledString={card.original_title
          ? card.original_title
          : "Untitled Card"}
      />
    </ModalHeader>
    <ModalBody>
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
          disabled={card.is_archived}
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
          disabled={card.is_archived}
        />
      </FormGroup>
      <Container>
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="dueDate">Due Date</Label>
              <Input
                type="date"
                name="dueDate"
                id="dueDate"
                bind:value={card.due_date_time}
                disabled={card.is_archived}
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
                disabled={card.due_date_time === ""}
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
                bind:value={card.remind_date_time}
                disabled={card.due_date_time === ""}
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
                disabled={card.remind_date_time === ""}
              />
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </ModalBody>
    <ModalFooter>
      <Container>
        <Row>
          <Col xs="4">
            {#if !card.is_archived}
              <ColorPicker bind:color={card.color} />
            {/if}
          </Col>
          <Col xs="8">
            <ArchiveCard bind:card />
          </Col>
        </Row>
      </Container>
    </ModalFooter>
  </Modal>
  <Reminder {card} />
</div>

<style>
  .view-card-parent :global(.card-card-label) {
    background-color: var(--card-color, transparent);
  }
</style>
