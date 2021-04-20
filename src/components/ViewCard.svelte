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
  import CardTitle from "./CardTitle.svelte";
  import ColorPicker from "./ColorPicker.svelte";
  import Reminder from "./Reminder.svelte";
  import ArchiveCard from "./ArchiveCard.svelte";
  import formattedDate from "../routes/_date-format.js";

  export let card;
  export let id;

  let open = false;
  const toggle = () => (open = !open);

  $: cardColor = card.color;
  $: {
    if (card.is_archived) {
      cardColor = "#AAAAAA";
    }
  }
</script>

<div class="parent" style="--card-color: {cardColor}">
  <Card {card} {id} on:click={toggle} />
  <Modal isOpen={open} {toggle}>
    <ModalHeader class="cardLabel" {toggle}>
      <CardTitle
        bind:value={card.card_name}
        {id}
        disabled={card.is_archived}
        untitledString={card.original_title
          ? card.original_title
          : "Untitled Card"}
      />
    </ModalHeader>
    <ModalBody>
      <div class="cardTitle">{card.original_title}</div>
      <div class="eventDate">
        {#if !card.original_date}
          {formattedDate(new Date(card.due_date_time))}
        {:else}
          {formattedDate(new Date(card.original_date))}
        {/if}
      </div>
      <FormGroup class="cardNotes">
        <Label for="cardNotes">NOTES</Label>
        <Input
          type="textarea"
          name="text"
          id="cardNotes"
          bind:value={card.description}
          disabled={card.is_archived}
        />
      </FormGroup>
      <FormGroup class="cardAttachments">
        <Label for="attachements">
          <Icon class="paperClip" name="paperclip" />
          Attachments
        </Label>
        <CustomInput
          type="file"
          id="attachments"
          name="customFile"
          disabled={card.is_archived}
        />
      </FormGroup>
      <Container class="container">
        <Row>
          <Col class="leftHalfDate" xs="6">
            <FormGroup class="dueDate">
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
          <Col class="rightHalfDate" xs="6">
            <FormGroup>
              <Label for="exampleTime">Time</Label>
              <Input
                type="time"
                name="time"
                id="reminderTime"
                placeholder="time placeholder"
                disabled={card.due_date_time === ""}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col class="leftHalfDate" xs="6">
            <FormGroup class="reminderSet">
              <Label for="reminderSet">Reminder</Label>
              <Input
                type="date"
                name="reminderSet"
                id="reminderSet"
                bind:value={card.remind_date_time}
                disabled={card.due_date_time === ""}
              />
            </FormGroup>
          </Col>
          <Col class="rightHalfDate" xs="6">
            <FormGroup>
              <Label for="exampleTime">Time</Label>
              <Input
                type="time"
                name="time"
                id="reminderTime"
                placeholder="time placeholder"
                disabled={card.remind_date_time === ""}
              />
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </ModalBody>
    <ModalFooter>
      <Container class="container">
        <Row>
          <Col class="leftHalf" xs="4">
            {#if !card.is_archived}
              <ColorPicker bind:color={card.color} />
            {/if}
          </Col>
          <Col class="rightHalf" xs="8">
            <ArchiveCard bind:is_archived={card.is_archived} />
          </Col>
        </Row>
      </Container>
    </ModalFooter>
  </Modal>
  <Reminder {card} />
</div>

<style>
  .parent :global(.cardLabel) {
    background-color: var(--card-color, transparent);
  }

  .parent :global(.archiveCard) {
    background-color: transparent;
    color: black;
  }

  .parent :global(.colorBar) {
    width: 50px;
  }
</style>
