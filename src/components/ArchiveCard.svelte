<script>
  import {
    Icon,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from "sveltestrap/src";

  export let is_archived;

  let open = false;
  const toggle = () => {
    open = !open;
  };
</script>

<div class="parent">
  <Button color="#ffffff" on:click={toggle}>
    <Icon name="archive" />
    Archive Card
  </Button>
  <Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>Confirm</ModalHeader>
    <ModalBody>Are you sure you want to archive card?</ModalBody>
    <ModalFooter>
      <Button color="secondary" on:click={toggle}>Cancel</Button>
      <Button
        color="primary"
        on:click={() => {
          is_archived = !is_archived;
          toggle();
        }}
      >
        Archive
      </Button>
    </ModalFooter>
  </Modal>
</div>

<style>
  .parent {
    border: solid;
    border-radius: 8px;
    border-color: lightgray;
    border-width: 2px;
  }
</style>
