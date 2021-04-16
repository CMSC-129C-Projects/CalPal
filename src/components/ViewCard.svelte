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
  export let id;

  let open = false;
  const toggle = () => (open = !open);

  $: cardColor = card.color;
</script>

<div class="view-card-parent" style="--card-color: {cardColor}">
  <Card {card} {id} on:click={toggle} />
  <Modal isOpen={open} {toggle}>
    <ModalHeader class="card-card-label" {toggle}>
      <Title
        bind:value={card.card_name}
        {id}
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
        />
      </FormGroup>
      <FormGroup>
        <Label for="attachements">
          <Icon name="paperclip" />
          Attachments
        </Label>
        <CustomInput type="file" id="attachments" name="customFile" />
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
              />
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label for="reminderSet">Reminder Set</Label>
              <Input
                type="date"
                name="reminderSet"
                id="reminderSet"
                bind:value={card.remind_date_time}
                disabled={card.due_date_time === ""}
              />
            </FormGroup>
          </Col>
        </Row>
      </Container>
      <ColorPicker bind:color={card.color} />
    </ModalBody>
    <ModalFooter>
      <ArchiveCard bind:is_archived={card.is_archived} />
    </ModalFooter>
  </Modal>
  <Reminder {card} />
</div>

<style>
  .view-card-parent :global(.card-card-label) {
    background-color: var(--card-color, transparent);
  }
</style>
