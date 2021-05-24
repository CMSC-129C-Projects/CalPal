<script>
  import { stores, goto } from "@sapper/app";
  import { onMount } from "svelte";
  import {
    Icon,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "sveltestrap";

  const { session } = stores();

  let isSignOutModalVisible = false;

  const toggleSignOutModal = () => {
    isSignOutModalVisible = !isSignOutModalVisible;
  };

  $: onModalClose = () => {};

  onMount(() => {
    window.onSignOut = async () => {
      const auth2 = gapi.auth2.getAuthInstance();
      await auth2.signOut();
      console.debug("User signed out.");

      await fetch(`/api/user/signout`, {
        method: "POST"
      });
      $session.did_cards_load = false;
      $session.user_id = "";
      $session.lists = [];
      $session.archived_cards = [];

      goto("/");
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
        window.onSignOut();
      }}
    >
      <Icon name="box-arrow-left" />
      Sign Out
    </Button>
  </ModalFooter>
</Modal>
