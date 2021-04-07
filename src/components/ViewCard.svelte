<script>
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Icon,
    CustomInput,
    Col,
    Container,
    Row,
  } from "sveltestrap/src";
  let open = false;
  const toggle = () => (open = !open);
</script>

<div class="parent">
  <Button color="danger" on:click={toggle}>Open Modal</Button>
  <Modal isOpen={open} {toggle}>
    <ModalHeader class="cardLabel" {toggle}>Enter a Label</ModalHeader>
    <ModalBody>
      <div class="cardTitle">John Smith's Birthday</div>
      <div class="eventDate">January 1, 2022</div>
      <FormGroup class="cardNotes">
        <Label for="cardNotes">NOTES</Label>
        <Input type="textarea" name="text" id="cardNotes" />
      </FormGroup>
      <FormGroup class="cardAttachments">
        <Label for="attachements"
          ><Icon class="paperClip" name="paperclip" />Attachements</Label
        >
        <CustomInput type="file" id="attachments" name="customFile" />
      </FormGroup>
      <FormGroup class="cardColor">
        <Label for="cardColor">Color</Label>
        <Input
          type="color"
          name="cardColor"
          id="cardColor"
          placeholder="color placeholder"
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
                placeholder="date placeholder"
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
                placeholder="date placeholder"
              />
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </ModalBody>
    <ModalFooter>
      <Button class="archiveCard"><Icon name="archive" /> Archive</Button>
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
