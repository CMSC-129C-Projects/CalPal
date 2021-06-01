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
  } from "sveltestrap";

  const { session } = stores();
  const dispatch = createEventDispatcher();

  export let card;
  export let isArchived;

  let open = false;
  let openDeleteModal = false;
  const toggle = () => {
    open = !open;
  };
  const toggleDeleteModal = () => {
    openDeleteModal = !openDeleteModal;
  };

  function notifyCardArchived(cardId) {
    dispatch("cardarchived", cardId);
  }

  function notifyCardUnarchived(cardId) {
    dispatch("cardunarchived", cardId);
  }

  async function deleteCard(cardIdToDelete) {
    // Delete attachments of the card so that there are no stray
    // files left over.
    await fetch(`/api/card/attachment/delete/card/${cardIdToDelete}`, {
      method: "DELETE",
    });

    const cardIndex = $session.archived_cards.findIndex(
      (card) => card._id === cardIdToDelete
    );
    console.debug(`[ArchiveCard.svelte] cardIndex: ${cardIndex}`);
    const cardsBefore = $session.archived_cards.slice(0, cardIndex);
    const cardsAfter = $session.archived_cards.slice(cardIndex + 1);
    console.debug(
      `[ArchiveCard.svelte] cardsBefore: ${JSON.stringify(cardsBefore)}`
    );
    console.debug(
      `[ArchiveCard.svelte] cardsAfter: ${JSON.stringify(cardsAfter)}`
    );
    $session.archived_cards = [...cardsBefore, ...cardsAfter];
  }
</script>

<div class="parent">
  {#if isArchived}
    <Button outline color="primary" on:click={toggle}>
      <Icon name="archive" />
      Unarchive
    </Button>
    <Button outline color="danger" on:click={toggleDeleteModal}>
      <Icon name="trash" />
      Delete
    </Button>
    <Modal isOpen={openDeleteModal} toggle={toggleDeleteModal}>
      <ModalHeader toggle={toggleDeleteModal}>Deleting card</ModalHeader>
      <ModalBody>
        Are you sure you want to delete "{card.card_name}"?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" on:click={toggleDeleteModal}>Cancel</Button>
        <Button color="danger" on:click={() => deleteCard(card._id)}>
          <Icon name="trash" />
          Delete
        </Button>
      </ModalFooter>
    </Modal>
    <Modal isOpen={open} {toggle}>
      <ModalHeader {toggle}>Unarchiving card</ModalHeader>
      <ModalBody>
        Are you sure you want to unarchive "{card.card_name}"?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" on:click={toggle}>Cancel</Button>
        <Button
          color="primary"
          on:click={() => {
            notifyCardUnarchived(card._id);
            toggle();
          }}
        >
          <Icon name="archive" />
          Unarchive
        </Button>
      </ModalFooter>
    </Modal>
  {:else}
    <Button outline color="warning" on:click={toggle}>
      <Icon name="archive" />
      Archive
    </Button>
    <Modal isOpen={open} {toggle}>
      <ModalHeader {toggle}>Archiving card</ModalHeader>
      <ModalBody>
        Are you sure you want to archive "{card.card_name}"?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" on:click={toggle}>Cancel</Button>
        <Button
          color="warning"
          on:click={() => {
            notifyCardArchived(card._id);
            toggle();
          }}
        >
          <Icon name="archive" />
          Archive
        </Button>
      </ModalFooter>
    </Modal>
  {/if}
</div>
