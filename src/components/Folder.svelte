<script>
  import { stores } from "@sapper/app";
  import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Row,
    Col,
    Collapse,
    Button,
    Icon,
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "sveltestrap";

  // import FolderCard from "./FolderCard.svelte";
  import getObjectId from "../routes/_object-id.js";
  import Title from "./Title.svelte";
  import ViewCard from "./ViewCard.svelte";

  const { session } = stores();

  export let folder;
  export let listId;
  
  let isOpen = false;
  let isDropdownOpen = false;
  let isModalOpen = false;

  const toggleDropdown = () => {
    isDropdownOpen = !isDropdownOpen;
  };

  const toggleModal = () => {
    isModalOpen = !isModalOpen;
  };

  async function addCard() {
    const objectId = await getObjectId();
    folder.cards = [
      ...folder.cards,
      {
        _id: objectId,
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

  const deleteFolder = (folderIdToDelete) => {
    $session.lists = $session.lists.map((list) => {
      if (list._id !== listId) {
        return list;
      }
      list.cards = list.cards.filter((folder) => folder._id !== folderIdToDelete)
      return list;
    });

  };
</script>

<Card style="width: 100%; margin-bottom:5%">
  <CardHeader style="background-color: rgba(0, 0, 0, 0.02);">
    <Row>
      <Col xs="2">
        <div style="padding-top: 0.2rem;">
          <Icon name="folder" />
        </div>
      </Col>
      <Col xs="8">
        <Title
          bind:value={folder.folder_name}
          id="folder-{folder._id}"
          untitledString="New Folder"
        />
      </Col>
      <Col xs="2">
        <button on:click={() => (isOpen = !isOpen)} class="borderless-button">
          {#if isOpen}
            <Icon name="chevron-up" style="padding-top: 0.4rem;" />
          {:else}
            <Icon name="chevron-down" style="padding-top: 0.4rem;" />
          {/if}
        </button>
      </Col>
    </Row>
  </CardHeader>
  {#if isOpen}
    <CardBody>
      <Row style="padding-left: 0%;">
        <Collapse style="padding: 0%;" {isOpen}>
          {#each folder.cards.filter((c) => {
            return !(typeof c.card_name === "undefined" || c.is_archived);
          }) as card (card._id)}
            <ViewCard
              bind:card
              on:cardarchived
              on:cardunarchived={() => {
                console.debug(
                  `[List.svelte] Received 'cardunarchived', forwarding...`
                );
              }}
            />
          {/each}
        
        </Collapse>
      </Row>
    </CardBody>
    <CardFooter style="padding-top: 0%; padding-bottom: 0%;">
      <Row>
        <Col xs="9" style="padding-left:0%; padding-top: 1%;">
          <button
            class="borderless-button list-add-card"
            on:click={() => addCard()}
          >
            <Icon class="list-plus-icon" name="plus" />
            Add Card
          </button>
        </Col>
        <Col xs="3" align="right">
          <Dropdown
            isOpen={isDropdownOpen}
            class={isDropdownOpen}
            toggle={toggleDropdown}
          >
            <DropdownToggle
              class="folder-drop-down-button"
              style=" background-color: transparent; color: #40415a; vertical-align: middle; border: none; outline: none; line-height: 0%; padding: 0; font-size: 1.5em;"
              >
              <Icon class="threeDots" name="three-dots" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem on:click={toggleModal}>Delete Folder</DropdownItem>
              </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
    </CardFooter>
    <Modal isOpen={isModalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Deleting folder</ModalHeader>
      <ModalBody
        >Are you sure you want to delete "{folder.folder_name}"?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" on:click={toggleModal}>Cancel</Button>
        <Button color="danger"  on:click={() => deleteFolder(folder._id)}>
          <Icon name="trash" />
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  {/if}
</Card>

<style>
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
</style>
