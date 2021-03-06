<script>
  import { stores } from "@sapper/app";
  import { flip } from "svelte/animate";
  import { dndzone, TRIGGERS } from "svelte-dnd-action";
  import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Icon,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "sveltestrap";
  import Title from "./Title.svelte";
  import ViewCard from "./ViewCard.svelte";
  import Folder from "./Folder.svelte";
  import getObjectId from "../routes/util/_object-id.js";

  const { session } = stores();
  const flipDurationMs = 100;

  export let list;

  let isDropdownOpen = false;
  let isModalOpen = false;
  let listId = list._id;

  const toggleDropdown = () => {
    isDropdownOpen = !isDropdownOpen;
  };

  const toggleModal = () => {
    isModalOpen = !isModalOpen;
  };

  function deleteList() {
    fetch(`/api/card/attachment/delete/list/${list._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: $session.user_id,
      }),
    });

    $session.lists = $session.lists.filter((l) => {
      if (l._id === list._id) {
        return false;
      }
      return true;
    });
  }

  function addCard() {
    list.cards = [
      ...list.cards,
      {
        _id: getObjectId(),
        card_name: "Untitled Card",
        original_title: "",
        original_calendar: "",
        original_date: "",
        date_created: new Date(Date.now()),
        due_date_time: "",
        remind_date_time: "",
        description: "",
        color: "#ffffff",
      },
    ];
  }

  function addFolder() {
    list.cards = [
      ...list.cards,
      {
        _id: getObjectId(),
        folder_name: "Untitled Folder",
        is_open: false,
        cards: [],
      },
    ];
  }

  function handleConsider(e) {
    const {
      items,
      info: { id, trigger },
    } = e.detail;

    if (trigger === TRIGGERS.DRAG_STARTED) {
      const isFolder = (object) => {
        return object?.folder_name != null ?? false;
      };

      const draggedItem = list.cards.find((e) => e._id === id);
      if (isFolder(draggedItem)) {
        $session.isDraggingFolder = true;
      }
    }

    list.cards = items;
  }

  function handleSort(e) {
    $session.isDraggingFolder = false;
    list.cards = e.detail.items;
  }
</script>

<div class="list-parent">
  <Card class="list-list">
    <CardHeader>
      <div
        style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5em;"
      >
        <CardTitle class="card-card-title-container">
          <Title bind:value={list.list_name} untitledString="Untitled List" />
        </CardTitle>
        <button
          class="borderless-button list-new-folder"
          on:click={() => addFolder()}
        >
          <Icon class="list-new-folder" name="folder-plus" />
        </button>
      </div>
    </CardHeader>
    <CardBody class="list-list-body">
      <div
        use:dndzone={{
          items: list.cards,
          centreDraggedOnCursor: true,
          dropTargetStyle: {
            outline: "rgba(0, 176, 240, 0.125) solid 2px",
          },
          flipDurationMs,
        }}
        on:consider={handleConsider}
        on:finalize={handleSort}
        class="list-dnd-zone"
      >
        {#each list.cards as listElement (listElement._id)}
          <div animate:flip={{ duration: flipDurationMs }}>
            {#if listElement.card_name != null}
              <ViewCard bind:card={listElement} />
            {:else}
              <Folder bind:folder={listElement} bind:listId />
            {/if}
          </div>
        {/each}
      </div>
    </CardBody>
    <CardFooter class="list-list-footer">
      <button
        class="borderless-button list-add-card"
        on:click={() => addCard()}
      >
        <Icon class="list-plus-icon" name="plus" />
        Add Card
      </button>
      <Dropdown
        isOpen={isDropdownOpen}
        class={isDropdownOpen ? "list-is-open" : ""}
        toggle={toggleDropdown}
      >
        <DropdownToggle class="list-drop-down-button">
          <Icon name="three-dots" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem on:click={toggleModal}>Delete List</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </CardFooter>
    <Modal isOpen={isModalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Deleting list</ModalHeader>
      <ModalBody>
        Are you sure you want to delete "{list.list_name}"?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" on:click={toggleModal}>Cancel</Button>
        <Button color="danger" on:click={() => deleteList()}>
          <Icon name="trash" />
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  </Card>
</div>

<style>
  .list-parent :global(.list-list) {
    width: 272px;
    min-width: 272px;
    max-height: 100%;
  }

  .list-parent :global(.card-card-title-container) {
    margin: 0px 0px 0px 0px;
    padding: 0%;
  }

  .list-parent :global(.list-list-body) {
    display: flex;
    flex-direction: column;
    padding: 0em;
    max-height: 100%;
    overflow: hidden;
  }

  .list-dnd-zone {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding: 0.5em;
    min-height: 1.5rem;
    max-height: 100%;
    overflow-y: auto;
  }

  .list-parent :global(.list-list-footer) {
    display: flex;
    justify-content: space-between;
    padding-top: 0;
    padding-bottom: 0;
    text-align: center;
    vertical-align: middle;
    font-size: medium;
  }

  .borderless-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    vertical-align: middle;
    border: none;
    outline: none;
    line-height: 0%;
    padding: 0;
    transition: transform 0.05s;
  }

  .list-parent :global(.list-add-card) {
    color: #40415a;
    margin: -0.3em;
    font-size: 15px;
  }

  .list-parent :global(.list-drop-down-button) {
    background-color: transparent;
    color: #40415a;
    vertical-align: middle;
    border: none;
    outline: none;
    line-height: 0%;
    padding: 0;
    font-size: 1.5em;
  }

  .list-parent :global(.list-plus-icon) {
    color: #40415a;
    font-size: 1.5em;
  }

  .list-parent :global(.list-new-folder) {
    color: #40415a;
    margin-top: 0.08em;
    font-size: 1.2em;
  }

  .list-parent :global(.list-new-folder:active) {
    color: #f58f29;
  }

  .list-parent :global(.list-new-folder:hover) {
    transform: scale(1.05);
  }

  .list-parent :global(.list-plus-icon:active) {
    color: #f58f29;
  }

  .list-parent :global(.list-plus-icon:hover) {
    transform: scale(1.05);
  }

  .list-parent :global(.list-add-card:active) {
    color: #f58f29;
  }

  .list-parent :global(.list-add-card:hover) {
    transform: scale(1.05);
  }

  .list-parent :global(.list-drop-down-button:hover) {
    transform: scale(1.05);
  }

  .list-parent :global(.list-is-open) {
    outline: none;
  }
</style>
