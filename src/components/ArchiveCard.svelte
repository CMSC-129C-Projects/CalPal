<script>
  import { stores } from "@sapper/app";
  import {
    Icon,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from "sveltestrap";

  const { session } = stores();

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

  function handleCardArchived() {
    $session.archived_cards = [...$session.archived_cards, card];

    for (const list of $session.lists) {
      let cardIndex = list.cards.findIndex((c) => c._id === card._id);

      if (cardIndex !== -1) {
        // Found the card in the first level. Remove it.
        list.cards = list.cards.filter((c) => c._id !== card._id);
        return;
      } else {
        // If the card cannot be found in the first level, try to look
        // through the folders.
        const folders = list.cards.filter((c) => c.folder_name ?? false);
        for (const folder of folders) {
          cardIndex = folder.cards.findIndex((c) => c._id === card._id);
          if (cardIndex !== -1) {
            // Found the card in this folder. Remove it.
            folder.cards = folder.cards.filter((c) => c._id !== card._id);
            return;
          }
        }
      }
    }
  }

  function handleCardUnarchived() {
    if ($session.archived_cards === null || $session.lists.length === 0) {
      throw new Error(`There are no lists to place the unarchived card into`);
    }

    const cardToUnarchive = $session.archived_cards.find(
      (c) => c._id === card._id
    );

    if (typeof cardToUnarchive === "undefined") {
      throw new Error(
        `Couldn't find card ${card._id} in the list of archived cards`
      );
    }

    $session.lists[0].cards = [...$session.lists[0].cards, cardToUnarchive];

    $session.archived_cards = $session.archived_cards.filter(
      (c) => c._id !== card._id
    );
  }

  function deleteCard() {
    // Delete attachments of the card so that there are no stray
    // files left over.
    fetch(`/api/card/attachment/delete/card/${card._id}`, {
      method: "DELETE",
    });

    $session.archived_cards = $session.archived_cards.filter(
      (c) => c._id !== card._id
    );
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
        <Button color="danger" on:click={() => deleteCard()}>
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
            handleCardUnarchived();
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
            handleCardArchived();
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
