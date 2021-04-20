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
  {#if is_archived}
    <Button outline color="warning" on:click={toggle}>
      <Icon name="archive" />
      Unarchive Card
    </Button>
    <Modal isOpen={open} {toggle}>
      <ModalHeader {toggle}>Confirm</ModalHeader>
      <ModalBody>Are you sure you want to unarchive card?</ModalBody>
      <ModalFooter>
        <Button color="secondary" on:click={toggle}>Cancel</Button>
        <Button
          color="primary"
          on:click={() => {
            is_archived = !is_archived;
            toggle();
          }}
        >
          Unarchive
        </Button>
      </ModalFooter>
    </Modal>
  {:else}
    <Button outline color="danger" on:click={toggle}>
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
  {/if}
</div>

<style>
</style>
