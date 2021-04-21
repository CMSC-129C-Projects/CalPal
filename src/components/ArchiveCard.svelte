<script>
  import { stores } from "@sapper/app";
  import { createEventDispatcher } from "svelte";
  import {
    Icon,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from "sveltestrap/src";

  const { session } = stores();
  const dispatch = createEventDispatcher();

  export let card;

  let open = false;
  let openDeleteModal = false;
  const toggle = () => {
    open = !open;
  };
  const toggleDeleteModal = () => {
    openDeleteModal = !openDeleteModal;
  };

  $: is_archived = $session.archived_cards.includes(card._id);

  function notifyCardArchived(cardId) {
    dispatch("cardarchived", cardId);
  }

  function unarchiveCard(cardIdToUnarchive) {
    //
  }

  function deleteCard(cardIdToDelete) {
    const cardIndex = $session.archived_cards
      .map((c) => {
        return c._id;
      })
      .findIndex(cardIdToDelete);
    const cardsBefore = $session.archived_cards.slice(0, cardIndex);
    const cardsAfter = $session.archived_cards.slice(cardIndex + 1);
    $session.archived_cards = [...cardsBefore, ...cardsAfter];
  }
</script>

<div class="parent">
  {#if is_archived}
    <Button outline color="warning" on:click={toggle}>
      <Icon name="archive" />
      Unarchive Card
    </Button>
    <Button outline color="danger" on:click={toggleDeleteModal}>
      <Icon name="archive" />
      Delete Card
    </Button>
    <Modal isOpen={openDeleteModal} {toggleDeleteModal}>
      <ModalHeader {toggleDeleteModal}>Confirm</ModalHeader>
      <ModalBody>Are you sure you want to delete card?</ModalBody>
      <ModalFooter>
        <Button color="secondary" on:click={toggleDeleteModal}>Cancel</Button>
        <Button color="primary" on:click={deleteCard}>Delete</Button>
      </ModalFooter>
    </Modal>
    <Modal isOpen={open} {toggle}>
      <ModalHeader {toggle}>Confirm</ModalHeader>
      <ModalBody>Are you sure you want to unarchive card?</ModalBody>
      <ModalFooter>
        <Button color="secondary" on:click={toggle}>Cancel</Button>
        <Button
          color="primary"
          on:click={() => {
            unarchiveCard(card._id);
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
            notifyCardArchived(card._id);
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
