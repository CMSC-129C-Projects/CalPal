<script>
  import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Button,
  } from "sveltestrap/src";

  let isOpen = false;

  import Sidebar from "./Sidebar.svelte";
  let sidebar_show = false;
</script>

<Dropdown {isOpen} toggle={() => (isOpen = !isOpen)}>
  <DropdownToggle>Menu</DropdownToggle>
  <DropdownMenu left>
    <DropdownItem header>Profile</DropdownItem>
    <DropdownItem>Settings</DropdownItem>
    <DropdownItem divider />
  </DropdownMenu>
  <Button on:click={() => (sidebar_show = !sidebar_show)}>Archive Cards</Button>
</Dropdown>

<Sidebar bind:show={sidebar_show} />

<style>
  /* .borderlessButton {
    background-color: transparent;
    border: none;
    outline: none;
    line-height: 10%;
    padding: 5%;
    font-size: 15px;
    transition: transform 0.05s;
    transform-origin: center center;
  } */
</style>
