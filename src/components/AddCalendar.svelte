<script>
  import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Col,
    Container,
    Row,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
  } from "sveltestrap/src";

  let open = false;
  const toggle = () => (open = !open);
</script>

<div class="add-calendar-parent">
  <Button on:click={toggle}>Add Calendar</Button>
  <Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>
      <span class="add-calendar-header-calpal add-calendar-header-cal">Cal</span
      >
      <span class="add-calendar-header-calpal add-calendar-header-pal">Pal</span
      >
      <span class="add-calendar-header"> - Add a New Calendar</span>
    </ModalHeader>
    <ModalBody>
      <Container>
        <Row class="add-calender-message">
          <Col>Input a shared calendar URL.</Col>
        </Row>
        <br />
        <Row>
          <Col>
            <FormGroup>
              <Row>
                <Col xs="1" class="add-calendar-left"
                  ><Label for="add-calendar-link">URL:</Label></Col
                >
                <Col xs="11" class="add-calendar-right">
                  <Input
                    type="url"
                    name="url"
                    id="add-calendar-url"
                    placeholder="Calendar URL"
                  />
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </ModalBody>
    <ModalFooter class="add-calendar-footer">
      <Button color="primary" on:click={toggle}>ADD CALENDAR</Button>
    </ModalFooter>
  </Modal>
</div>

<style>
  .add-calendar-parent :global(.add-calendar-header-calpal) {
    font-family: "Nunito", sans-serif;
    /* position: relative; */
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

  .add-calendar-parent :global(.add-calendar-left) {
    padding-top: 5px;
  }

  .add-calendar-parent :global(.add-calendar-footer) {
    justify-content: center;
  }
</style>
