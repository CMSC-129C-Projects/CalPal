<script>
  import {
    Button,
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
  import Title from "./Title.svelte";

  export let card;
  export let id;

  let open = false;
  const toggle = () => (open = !open);

  import ArchiveCard from "./ArchiveCard.svelte";
</script>

<div class="parent">
  <Button color="danger" on:click={toggle}>Open Modal</Button>
  <Modal isOpen={open} {toggle}>
    <ModalHeader class="cardLabel" {toggle}>
      <Title bind:value={card.card_name} {id} untitledString="Untitled Card" />
    </ModalHeader>
    <ModalBody>
      <div class="cardTitle">{card.card_name}</div>
      <div class="eventDate">{new Date(card.original_date)}</div>
      <FormGroup class="cardNotes">
        <Label for="cardNotes">NOTES</Label>
        <Input
          type="textarea"
          name="text"
          id="cardNotes"
          bind:value={card.description}
        />
      </FormGroup>
      <FormGroup class="cardAttachments">
        <Label for="attachements">
          <Icon class="paperClip" name="paperclip" />
          Attachments
        </Label>
        <CustomInput type="file" id="attachments" name="customFile" />
      </FormGroup>
      <FormGroup class="cardColor">
        <Label for="cardColor">Color</Label>
        <Input
          type="color"
          name="cardColor"
          id="cardColor"
          placeholder="#ffffff"
          bind:value={card.color}
        />
      </FormGroup>
      <Container class="container">
        <Row>
          <Col class="leftHalf" xs="6">
            <FormGroup class="dueDate">
              <Label for="dueDate">Due Date</Label>
              <Input
                type="date"
                name="dueDate"
                id="dueDate"
                bind:value={card.due_date_time}
              />
            </FormGroup>
          </Col>
          <Col class="rightHalf" xs="6">
            <FormGroup class="reminderSet">
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
    </ModalBody>
    <ModalFooter>
      <ArchiveCard />
    </ModalFooter>
  </Modal>
</div>

<style>
  .parent :global(.archiveCard) {
    background-color: transparent;
    color: black;
  }

  .cardTitle {
    /* background-color: lightyellow; */
  }

  .eventDate {
    /* background-color: lightseagreen; */
  }
</style>
