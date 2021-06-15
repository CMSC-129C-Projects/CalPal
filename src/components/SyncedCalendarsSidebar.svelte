<script>
  import { stores } from "@sapper/app";
  import {
    Offcanvas,
    Col,
    Container,
    Row,
    Icon,
    Button,
    Card,
    CardHeader,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "sveltestrap";
  import BackSidebar from "./BackSidebar.svelte";

  const { session } = stores();

  export let isSidebarOpen;

  let isOpen = false;
  const toggleSidebar = () => {
    isOpen = !isOpen;
    isSidebarOpen = false;
  };

  let calendarToDelete = null;
  let isDeleteModalOpen = false;
  const toggleDeleteModal = () => {
    if (isDeleteModalOpen) {
      calendarToDelete = null;
    }
    isDeleteModalOpen = !isDeleteModalOpen;
  };

  const deleteCalendar = (calendarId) => {
    $session.calendars = $session.calendars.filter((c) => c._id !== calendarId);
    console.debug(`Calendar "${calendarId}" deleted!`);
  };
</script>

<Button
  outline
  secondary
  style="width: 100%; color: black;"
  on:click={toggleSidebar}
>
  <Icon name="calendar-check-fill" />
  Synced Calendars
</Button>

<div>
  <Offcanvas {isOpen} placement="end" toggle={toggleSidebar}>
    <div slot="header" class="synced-calendars-sidebar-header-title">
      <BackSidebar bind:isCurrentMenuOpen={isOpen} bind:isSidebarOpen />
      Synced Calendars
    </div>
    <Container>
      {#if $session.calendars && $session.calendars.length > 0}
        {#each $session.calendars as calendar (calendar._id)}
          <Row style="margin-bottom: 1rem;">
            <Col>
              <Card>
                <CardHeader>
                  <Row>
                    <Col xs={10} style="display: flex; align-items: center;">
                      <h6 class="synced-calendars-sidebar-calendar-title">
                        {calendar.name}
                      </h6>
                    </Col>
                    <Col
                      xs={2}
                      style="display: flex; align-items: center; justify-content: flex-end;"
                    >
                      <Button
                        color="danger"
                        outline
                        on:click={() => {
                          calendarToDelete = calendar;
                          toggleDeleteModal();
                        }}
                      >
                        <Icon name="trash" />
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <code>
                    {calendar.src}
                  </code>
                </CardBody>
              </Card>
            </Col>
          </Row>
        {/each}
      {:else}
        <p>You don't have any synced calendars.</p>
      {/if}
    </Container>
  </Offcanvas>
</div>

<Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal}>
  <ModalHeader toggle={toggleDeleteModal}>Deleting calendar</ModalHeader>
  <ModalBody>
    <p>
      Are you sure you want to delete "{calendarToDelete.name}"? This will not
      delete any existing cards from this calendar.
    </p>
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" on:click={toggleDeleteModal}>Cancel</Button>
    <Button
      color="danger"
      on:click={() => {
        deleteCalendar(calendarToDelete._id);
        toggleDeleteModal();
      }}
    >
      <Icon name="trash" />
      Delete
    </Button>
  </ModalFooter>
</Modal>

<style>
  .synced-calendars-sidebar-header-title {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .synced-calendars-sidebar-calendar-title {
    margin-bottom: 0;
  }
</style>
