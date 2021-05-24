<script>
  import { onMount } from "svelte";
  import {
    Offcanvas,
    Col,
    Container,
    Row,
    Icon,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "sveltestrap";
  import BackSidebar from "./BackSidebar.svelte";

  export let isSignedIn;

  let isSignOutModalVisible = false;

  const toggleSignOutModal = () => {
    isSignOutModalVisible = !isSignOutModalVisible;
  };

  $: onModalClose = () => {};

  onMount(() => {
    // TODO: Clear out our `session` variables.
    window.onSignOut = async () => {
      const auth2 = gapi.auth2.getAuthInstance();
      await auth2.signOut();
      console.debug("User signed out.");
    };
  });
</script>

<Button
  outline
  secondary
  style="width: 100%; color:black;"
  on:click={() => {
    toggleSignOutModal();
  }}
>
  <Icon name="box-arrow-left" />
  Sign Out
</Button>

<Modal
  isOpen={isSignOutModalVisible}
  toggle={toggleSignOutModal}
  on:close={() => {
    onModalClose();
  }}
>
  <ModalHeader toggle={toggleSignOutModal}>Sign out</ModalHeader>
  <ModalBody>Are you sure you want to sign out?</ModalBody>
  <ModalFooter>
    <Button color="secondary" on:click={toggleSignOutModal}>Cancel</Button>
    <Button
      color="danger"
      on:click={() => {
        toggleSignOutModal();
        window.onSignOut();

        onModalClose = () => {
          isSignedIn = false;
        };
      }}
    >
      <Icon name="box-arrow-left" />
      Sign Out
    </Button>
  </ModalFooter>
</Modal>
